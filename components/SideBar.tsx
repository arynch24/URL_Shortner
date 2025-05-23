'use client';

import { Link2, QrCode, ChartLine } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const SideBar = () => {
    const pathname = usePathname();

    return (
        <div className="h-full w-50 px-3 pt-8 flex flex-col justify-start gap-1 border-r border-zinc-200">
            <Link href="/dashboard/links" className={`flex items-center gap-2 px-3 py-2 rounded hover:text-bf-blue hover:bg-gray-50 ${pathname === '/dashboard/links' ? 'bg-blue-50 text-bf-blue' : null}`}>
                <Link2 strokeWidth={1} size={22} /> Links
            </Link>

            <Link href="/dashboard/qrcodes" className={`flex items-center gap-2 px-3 py-2 rounded hover:text-bf-blue hover:bg-gray-50 ${pathname === '/dashboard/qrcodes' ? 'bg-blue-50 text-bf-blue' : null}`}>
                <QrCode strokeWidth={1} size={22} /> QR Code
            </Link>

            <Link href="/dashboard/analytics" className={`flex items-center gap-2 px-3 py-2 rounded hover:text-bf-blue hover:bg-gray-50 ${pathname === '/dashboard/analytics' ? 'bg-blue-50 text-bf-blue' : null}`}>
                <ChartLine strokeWidth={1} size={22} /> Analytics
            </Link>
        </div>
    );
};

export default SideBar;