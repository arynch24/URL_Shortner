import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';
import GoogleProvider from 'next-auth/providers/google';
import { use } from 'react';

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

                // Validate credentials
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email and password are required");
                }

                // Check if user exists in the database
                const existingUser = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });

                // If no user is found, throw an error
                if (!existingUser) {
                    throw new Error("No user found with this email address. Please sign up first.");
                }

                // Check if this is a Google OAuth user trying to set password
                if (existingUser.password === 'GOOGLE_OAUTH_USER') {
                    throw new Error("This email is linked to a Google account. Please sign in with Google or contact support to set a password.");
                }

                // Compare the provided password with the hashed password in the database
                const isPasswordCorrect = await bcrypt.compare(
                    credentials.password,
                    existingUser.password
                );

                // If the password is incorrect, throw an error
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

                    // If user does not exist, create a new user
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

                    // Assign the user ID to the user object for session handling
                    user.id = existingUser.id;
                    user.name = existingUser.name || user.name || 'Google User';
                    return true;
                } catch (error) {

                    // Log the error and return false to prevent sign in
                    console.error('Error during Google sign in:', error);
                    return false;
                }
            }
            
            return true;
        },

        // This callback is called when the user signs in with credentials
        async jwt({ token, user }: any) {

            // If user object is available, assign user ID to token
            if (user) {
                token.id = user.id;
            }

            // If the user signed in with Google, ensure the token has the user ID
            return token;
        },

        // This callback is called when the session is created or accessed
        async session({ session, token }: any) {

            // If the token has a user ID, assign it to the session user
            if (token && session.user) {
                session.user.id = token.id as string;
            }

            // Return the session object with user ID
            return session;
        },
    },
    pages: {
        signIn: '/auth/signin', // Custom sign-in page
        error: '/auth/error', // Error page
    },
    secret: process.env.NEXTAUTH_SECRET,
};
