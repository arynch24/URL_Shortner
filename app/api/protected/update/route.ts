import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { NEXT_AUTH_CONFIG } from '@/lib/auth';

export async function PATCH(req: Request) {
    const session: any = await getServerSession(NEXT_AUTH_CONFIG);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try{
        const session: any = await getServerSession(NEXT_AUTH_CONFIG);
        const userId = session.user.id;
        const {id, originalUrl, shortCode} = await req.json();

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
        if (!updateUrl) {
            return NextResponse.json({ error: "URL not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "URL updated successfully" });
    }
    catch (error) {
        console.error("Error updating URL:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
