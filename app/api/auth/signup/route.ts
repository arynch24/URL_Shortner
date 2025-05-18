import { prisma } from '@/lib/prisma'
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

type reqBody = {
    name: string,
    email: string,
    password: string
}

export async function POST(req: Request) {

    try {
        const { name, email, password }: reqBody = await req.json();

        if (!email || !password || !name) {
            return NextResponse.json({ error: 'Missing Fields' }, { status: 400 })
        }

        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return NextResponse.json({ error: 'User Already Exists' }, { status: 400 });
        }

        //10 is the salt rounds-how many times the hashing algorithm is run
        //It means bcrypt will apply the hashing algorithm 2¹⁰ = 1024 times.

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        })
        return NextResponse.json({ message: 'User created', user });
    }
    catch (error) {
        console.error('Signup Error', error);
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
    }
}
