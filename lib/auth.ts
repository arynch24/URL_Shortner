import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';

export const NEXT_AUTH_CONFIG = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'email', type: 'text', placeholder: '' },
                password: { label: 'password', type: 'password', placeholder: '' },
            },
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

                return {
                    id: existingUser.id,
                    name: existingUser.name,
                    email: existingUser.email,
                };
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
};
