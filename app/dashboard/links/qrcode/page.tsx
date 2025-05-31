'use client';

import { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import Link from 'next/link';
import { Suspense } from 'react';

const QRCodeForm: React.FC = () => {
    const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
    const [id, setId] = useState('');
    const [destUrl, setDestUrl] = useState('');
    const [shortCode, setShortCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Get search params after component mounts (client-side only)
        const urlParams = new URLSearchParams(window.location.search);
        const urlId = urlParams.get('id') || '';
        const urlDestUrl = urlParams.get('destUrl') || '';
        const urlShortCode = urlParams.get('shortCode') || '';

        setId(urlId);
        setDestUrl(urlDestUrl);
        setShortCode(urlShortCode);
        setMounted(true);

        // Generate QR code if destUrl is available
        if (urlDestUrl) {
            generateQRCode(urlDestUrl);
        }
    }, []);

    const generateQRCode = async (url: string) => {
        try {
            const qrUrl = await QRCode.toDataURL(url);
            setQrCodeUrl(qrUrl);
        } catch (err) {
            console.error('Failed to generate QR Code:', err);
        }
    };

    const handleDownload = async () => {
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
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading QR code:', error);
        } finally {
            setLoading(false);
        }
    }

    // Show loading until mounted and params are loaded
    if (!mounted) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
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
                                    onClick={handleDownload}
                                    disabled={loading || !qrCodeUrl}>
                                    {loading ? 'Downloading...' : 'Download'}
                                </button>
                            </div>

                        </div>
                        <div>
                            <div className="border border-zinc-300 bg-zinc-100 p-4 rounded-xl">
                                {qrCodeUrl ? (
                                    <img src={qrCodeUrl} alt="QR Code" className="w-48 h-48" />
                                ) : (
                                    <div className="w-48 h-48 flex items-center justify-center text-zinc-500">
                                        Generating QR Code...
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const QRCodeGenerator = () => {
    return (
        <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}>
            <QRCodeForm />
        </Suspense>
    );
};

export default QRCodeGenerator;