import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server';


export async function GET(req: Request, { params }: any) {
    try {
        // Extract the shortCode from the request parameters
        const shortCode = params.shortCode;

        // Validate the shortCode format
        const shortCodeExists = await prisma.url.findUnique({
            where: { shortCode }
        });

        // If the shortCode does not exist, return a 404 error
        if (!shortCodeExists) {
            return NextResponse.json({ error: 'Short code does not exist' }, { status: 404 });
        }

        // Increment the click count for the URL associated with the shortCode
        const clickCount = shortCodeExists.clicks;

        // Update the URL in the database with the incremented click count
        const updated = await prisma.url.update({
            where: { shortCode },
            data: { clicks: clickCount + 1 }
        });

        console.log("Updated clicks:", updated.clicks);

        // Redirect to the original URL associated with the shortCode
        return NextResponse.redirect(shortCodeExists.originalUrl, 301);
    } catch (error) {

        // Log the error and return a 500 Internal Server Error response
        console.error('Error redirecting:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
