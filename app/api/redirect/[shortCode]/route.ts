import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: any) {
    try {
        const shortCode = params.shortCode;

        const shortCodeExists = await prisma.url.findUnique({
            where: { shortCode }
        });

        if (!shortCodeExists) {
            return NextResponse.json({ error: 'Short code does not exist' }, { status: 404 });
        }

        const clickCount = shortCodeExists.clicks;

        const updated = await prisma.url.update({
            where: { shortCode },
            data: { clicks: clickCount + 1 }
        });

        console.log("Updated clicks:", updated.clicks);

        return NextResponse.redirect(shortCodeExists.originalUrl, 301);
    } catch (error) {
        console.error('Error redirecting:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
