import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';
import GoogleProvider from 'next-auth/providers/google';

export const NEXT_AUTH_CONFIG = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
          }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'email', type: 'text', placeholder: '' },
                password: { label: 'password', type: 'password', placeholder: '' },
            },
            //this is called when user trys to signin with the credentials
            async authorize(credentials: any) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email and password are required");
                }

                const existingUser = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });

                if (!existingUser) {
                    throw new Error("No user found with this email address. Please sign up first.");
                }

                // Check if this is a Google OAuth user trying to set password
                if (existingUser.password === 'GOOGLE_OAUTH_USER') {
                    throw new Error("This email is linked to a Google account. Please sign in with Google or contact support to set a password.");
                }

                const isPasswordCorrect = await bcrypt.compare(
                    credentials.password,
                    existingUser.password
                );

                if (!isPasswordCorrect) {
                    throw new Error("Invalid credentials. Please check your email and password.");
                }

                //This object is passed to the jwt() callback as user to generate token jwt.sign() if u remember
                return {
                    id: existingUser.id,
                    name: existingUser.name,
                    email: existingUser.email,
                };
            },
        }),
    ],
    callbacks: {
        async signIn({ user, account }: any) {
            // Handle Google OAuth sign in
            if (account?.provider === 'google') {
                try {
                    // Check if user already exists in database
                    let existingUser = await prisma.user.findUnique({
                        where: { email: user.email },
                    });

                    if (!existingUser) {
                        // Create new user for Google sign-in with a placeholder password
                        existingUser = await prisma.user.create({
                            data: {
                                email: user.email,
                                name: user.name || 'Google User',
                                password: 'GOOGLE_OAUTH_USER', // Placeholder for OAuth users
                            },
                        });
                    }

                    // Set the user id for the session
                    user.id = existingUser.id;
                    return true;
                } catch (error) {
                    console.error('Error during Google sign in:', error);
                    return false;
                }
            }
            
            return true;
        },
        
        async jwt({ token, user }: any) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        
        async session({ session, token }: any) {
            if (token && session.user) {
                session.user.id = token.id as string;
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};
