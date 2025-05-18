"use server"

import { prisma } from '@/lib/prisma'
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';

const handleSignup = async (formData: FormData) => {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const name = formData.get('name') as string;

    const existingUser = await prisma.user.findUnique({
        where: { email }
    });

    if (existingUser) {
        throw new Error('User Already Exists');
    }

    //10 is the salt rounds-how many times the hashing algorithm is run
    //It means bcrypt will apply the hashing algorithm 2¹⁰ = 1024 times.

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
        data: {
            email,
            name,
            password:hashedPassword
        }
    })
    
    redirect('/');
}

export default handleSignup;