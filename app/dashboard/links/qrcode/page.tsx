'use client';

import { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { useSearchParams } from "next/navigation";
import Link from 'next/link';

const QRCodeGenerator: React.FC<{ text: string }> = () => {
    const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
    const searchParams = useSearchParams();

    const id = searchParams.get('id') as string;
    const destUrl = searchParams.get('destUrl') as string;
    const shortCode = searchParams.get('shortCode') as string;

    useEffect(() => {
        const generateQRCode = async () => {
            try {
                const url = await QRCode.toDataURL(destUrl);
                setQrCodeUrl(url);
            } catch (err) {
                console.error('Failed to generate QR Code:', err);
            }
        };

        generateQRCode();
    }, [destUrl]);

    const [loading, setLoading] = useState(false);

    const handleDownlood = async () => {
        setLoading(true);
        try {
            const response = await fetch(qrCodeUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${shortCode || id}.png`;
            document.body.appendChild(a);
            a.click();
            a.remove();
        } catch (error) {
            console.error('Error downloading QR code:', error);
        } finally {
            setLoading(false);
        }
    }


    return (
        <div>
            <div className="h-full w-full flex justify-center pt-10">
                <div className="h-full w-4xl flex flex-col gap-3 bg-white p-6 rounded-md border-[0.5px] border-zinc-300">

                    <div className="flex flex-col gap-1">
                        <h1 className="text-2xl font-semibold text-zinc-800 ">QR Code</h1>
                        <p className="text-zinc-600 ">
                            Scan the QR code to access the destination URL.
                        </p>
                    </div>

                    <div className='flex justify-between w-full '>
                        <div className=" flex flex-col gap-3 rounded-md w-xl ">
                            <label className="text-sm font-medium text-zinc-700">Destination URL</label>
                            <input type='text' placeholder="https://your-long-url.com" value={destUrl} readOnly
                                className="border border-zinc-300 rounded-md px-3 py-2 focus:outline-none focus:border-sky-500"
                            />

                            <label className="text-sm font-medium text-zinc-700">Short Link</label>
                            <input type='text' placeholder="(optional)" value={shortCode} readOnly
                                className="border border-zinc-300 rounded-md px-3 py-2 focus:outline-none focus:border-sky-500"
                            />
                            <div className='w-full flex justify-between mt-2'>
                                <Link href='/dashboard/links'
                                    className="w-fit flex items-center gap-2 px-4 py-2  border border-zinc-500 rounded-md hover:bg-zinc-100 transition duration-200 cursor-pointer">
                                    Cancel
                                </Link>
                                <button
                                    className="w-fit flex items-center gap-2 bg-zinc-900 text-white px-4 py-2 rounded-md hover:bg-zinc-800 transition duration-200 cursor-pointer"
                                    onClick={handleDownlood}
                                    disabled={loading}>
                                    {loading ? 'Downloading...' : 'Download'}
                                </button>
                            </div>

                        </div>
                        <div >
                            <div className="border border-zinc-300 bg-zinc-100 p-4 rounded-xl">
                                {qrCodeUrl && <img src={qrCodeUrl} alt="QR Code" className="w-48 h-48" />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default QRCodeGenerator;
