import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { NEXT_AUTH_CONFIG } from '@/lib/auth';

export async function GET(req: any) {
    const session: any = await getServerSession(NEXT_AUTH_CONFIG);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
        const userId = session.user.id;
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        
        if (!id) {
            return NextResponse.json({ error: "ID is required" }, { status: 400 });
        }

        const url = await prisma.url.delete({
            where: {
                id: id,
                userId: userId,
            },
        });

        if (!url) {
            return NextResponse.json({ error: "URL not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "URL deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting URL:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}