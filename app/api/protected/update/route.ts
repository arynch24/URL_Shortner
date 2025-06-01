import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { NEXT_AUTH_CONFIG } from '@/lib/auth';

export async function PATCH(req: Request) {

    // Check if the user is authenticated
    const session: any = await getServerSession(NEXT_AUTH_CONFIG);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try{
        // Get the user ID from the session and the request body
        const session: any = await getServerSession(NEXT_AUTH_CONFIG);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Extract user ID from the session and the request body
        const userId = session.user.id;

        // Parse the request body to get the ID, original URL, and short code
        const {id, originalUrl, shortCode} = await req.json();

        // Validate the ID, original URL, and short code
        const updateUrl = await prisma.url.update({
            where: {
                userId: userId,
                id: id,
            },
            data: {
                originalUrl,
                shortCode
            },
        });

        // If the URL was not found or updated, return a 404 error
        if (!updateUrl) {
            return NextResponse.json({ error: "URL not found" }, { status: 404 });
        }

        // Return a success response
        return NextResponse.json({ message: "URL updated successfully" });
    }
    catch (error) {

        // Log the error and return a 500 Internal Server Error response
        console.error("Error updating URL:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
