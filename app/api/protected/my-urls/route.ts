import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { NEXT_AUTH_CONFIG } from '@/lib/auth';

export async function GET(req: Request) {

    // Check if the user is authenticated
    const session: any = await getServerSession(NEXT_AUTH_CONFIG);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch the URLs created by the authenticated user
    try {

        // Get the user ID from the session
        const userId = session.user.id;

        // Fetch URLs from the database where the userId matches the authenticated user's ID
        const urls = await prisma.url.findMany({
            where: {
                userId: userId,
            },
        });

        // If no URLs are found, return an empty array
        return NextResponse.json(urls);
    }
    catch (error) {

        // Log the error and return a 500 Internal Server Error response
        console.error("Error fetching URLs:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}