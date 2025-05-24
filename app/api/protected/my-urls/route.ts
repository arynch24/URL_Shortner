import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { NEXT_AUTH_CONFIG } from '@/lib/auth';

export async function GET(req: Request) {
    const session: any = await getServerSession(NEXT_AUTH_CONFIG);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
        const userId = session.user.id;
        const urls = await prisma.url.findMany({
            where: {
                userId: userId,
            },
        });
        return NextResponse.json(urls);
    }
    catch (error) {
        console.error("Error fetching URLs:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}