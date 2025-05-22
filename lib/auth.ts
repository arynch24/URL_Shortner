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
                    return null;
                }

                const isPasswordCorrect = await bcrypt.compare(
                    credentials.password,
                    existingUser.password
                );

                if (!isPasswordCorrect) {
                    return null;
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
        async session({ session, token }: any) {
            if (token && session.user) {
                session.user.id = token.sub as string; // add id to session.user
            }
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
};
