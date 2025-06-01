import { NextResponse } from "next/server";
import { prisma } from '@/lib/prisma';
import { nanoid } from "nanoid";
import { getServerSession } from "next-auth";
import { NEXT_AUTH_CONFIG } from '@/lib/auth';

export async function POST(req: Request) {
    try {
        // Parse the request body to get the original URL and custom code (if provided)
        const { originalUrl, customCode } = await req.json();

        // Validate the original URL
        if (!originalUrl) {
            return NextResponse.json({ error: 'URL is Missing' }, { status: 405 });
        }

        // Validate the URL format
        const session: any = await getServerSession(NEXT_AUTH_CONFIG);
        let code = customCode?.trim();

        // Check if the provided custom code is valid (if provided)
        if (code) {
            const existingCode = await prisma.url.findUnique({
                where: { shortCode: code }
            });

            // If the custom code already exists, return an error response
            if (existingCode) {
                return NextResponse.json({ error: 'Custom code is already taken' }, { status: 409 });
            }
        }

        // If no custom code is provided, generate a unique short code
        else {
            let isUnique = false;

            // Keep generating a new code until we find a unique one
            while (!isUnique) {
                code = nanoid(6);
                const exists = await prisma.url.findUnique({
                    where: { shortCode: code }
                });
                isUnique = !exists;
            }
        }

        // Create a new URL entry in the database with the original URL, short code, and user ID (if available)
        const newUrl = await prisma.url.create({
            data: {
                originalUrl,
                shortCode: code,
                userId: session?.user?.id
            }
        });

        // Log the newly created URL for debugging purposes
        return NextResponse.json({
            shortUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/${code}`,
            shortCode: code
        });

    } catch (error) {

        // Log the error and return a 500 Internal Server Error response
        console.error("POST /shorturl error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
