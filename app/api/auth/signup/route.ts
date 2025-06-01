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
        // Parse the request body to get user details
        const { name, email, password }: reqBody = await req.json();

        // Validate the required fields
        if (!email || !password || !name) {
            return NextResponse.json({ error: 'Missing Fields' }, { status: 400 })
        }

        // Check if the user already exists in the database
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        // If the user already exists, return an error response
        if (existingUser) {
            return NextResponse.json({ error: 'User Already Exists' }, { status: 400 });
        }

        // Hash the password before storing it in the database
        const hashedPassword = await bcrypt.hash(password, 10);// 10 is the salt rounds - number of hashing algo applied 2^10

        // Create a new user in the database with the provided details
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        })

        // Return a success response with the created user details
        return NextResponse.json({ message: 'User created', user });
    }
    catch (error) {

        // Log the error and return a 500 Internal Server Error response
        console.error('Signup Error', error);
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
    }
}
