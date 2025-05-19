import { NextResponse } from "next/server";
import { prisma } from '@/lib/prisma';
import { nanoid } from "nanoid";
import { getServerSession } from "next-auth";
import { NEXT_AUTH_CONFIG } from '@/lib/auth';

export async function POST(req: Request) {
    try {
        const { originalUrl, customCode } = await req.json();

        if (!originalUrl) {
            return NextResponse.json({ error: 'URL is Missing' }, { status: 405 });
        }

        const session: any = await getServerSession(NEXT_AUTH_CONFIG);
        let code = customCode?.trim();

        //if custom code is provided
        if (code) {
            const existingCode = await prisma.url.findUnique({
                where: { shortCode: code }
            });

            if (existingCode) {
                return NextResponse.json({ error: 'Custom code is already taken' }, { status: 409 });
            }
        }
        //generating our own short code using nanoid
        else {
            let isUnique = false;
            while (!isUnique) {
                code = nanoid(6);
                const exists = await prisma.url.findUnique({
                    where: { shortCode: code }
                });
                isUnique = !exists;
            }
        }

        console.log(session);
        const newUrl = await prisma.url.create({
            data: {
                originalUrl,
                shortCode: code,
                userId: session?.user?.id
            }
        });

        return NextResponse.json({
            shortUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/${code}`,
            shortCode: code
        });

    } catch (error) {
        console.error("POST /shorturl error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
