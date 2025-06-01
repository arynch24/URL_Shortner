import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { NEXT_AUTH_CONFIG } from '@/lib/auth';

export async function DELETE(req: any) {

    // Check if the user is authenticated
    const session: any = await getServerSession(NEXT_AUTH_CONFIG);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        // Get the user ID from the session and the URL parameters
        const userId = session.user.id;

        // Extract the ID from the request URL parameters
        const { searchParams } = new URL(req.url);

        // Get the ID from the search parameters
        const id = searchParams.get('id');

        // Validate the ID
        if (!id) {
            return NextResponse.json({ error: "ID is required" }, { status: 400 });
        }

        // Check if the URL exists and belongs to the user
        const url = await prisma.url.delete({
            where: {
                id: id,
                userId: userId,
            },
        });

        // If the URL was not found, return a 404 error
        if (!url) {
            return NextResponse.json({ error: "URL not found" }, { status: 404 });
        }

        // Return a success response
        return NextResponse.json({ message: "URL deleted successfully" });
    }
    catch (error) {

        // Log the error and return a 500 Internal Server Error response
        console.error("Error deleting URL:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}