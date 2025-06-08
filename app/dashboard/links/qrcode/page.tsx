'use client';

import { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import Link from 'next/link';

const QRCodeGenerator: React.FC = () => {

    // State to hold the generated QR code URL
    const [qrCodeUrl, setQrCodeUrl] = useState<string>('');

    // State to hold the ID, destination URL, and short code from URL parameters
    const [id, setId] = useState('');

    // State to hold the destination URL and short code
    const [destUrl, setDestUrl] = useState('');

    // State to hold the short code
    const [shortCode, setShortCode] = useState('');

    // State to manage loading state
    const [loading, setLoading] = useState(false);

    // State to manage mounted state to avoid SSR issues
    const [mounted, setMounted] = useState(false);

    // Solves the issue of deployment where the component tries to access window before it is mounted
    useEffect(() => {

        // Extract URL parameters from the current window location
        const urlParams = new URLSearchParams(window.location.search);
        const urlId = urlParams.get('id') || '';
        const urlDestUrl = urlParams.get('destUrl') || '';
        const urlShortCode = urlParams.get('shortCode') || '';

        // Set the state values based on the URL parameters
        setId(urlId);
        setDestUrl(urlDestUrl);
        setShortCode(urlShortCode);
        setMounted(true);

        // Generate QR code if destUrl is available
        if (urlDestUrl) {
            generateQRCode(urlDestUrl);
        }
    }, []);

    // Function to generate QR code from the destination URL
    const generateQRCode = async (url: string) => {
        try {

            // Validate the URL format
            const qrUrl = await QRCode.toDataURL(url);
            // Set the generated QR code URL in the state
            setQrCodeUrl(qrUrl);
        } catch (err) {
            // Log the error if QR code generation fails
            console.error('Failed to generate QR Code:', err);
        }
    };

    // Function to handle the download of the QR code image
    const handleDownload = async () => {
        setLoading(true);
        try {
            // Validate if qrCodeUrl is available
            if (!qrCodeUrl) {
                console.error('QR code URL is not available.');
                return;
            }
            // Create a link element to download the QR code image
            const response = await fetch(qrCodeUrl);
            // Check if the response is ok
            if (!response.ok) {
                throw new Error('Failed to fetch QR code image');
            }

            // Convert the response to a blob and create a download link
            const blob = await response.blob();

            // Create a URL for the blob and trigger the download
            const url = window.URL.createObjectURL(blob);

            // Create an anchor element to download the image
            const a = document.createElement('a');

            // Set the href and download attributes for the anchor element
            a.href = url;
            a.download = `${shortCode || id}.png`;

            // Append the anchor to the body, trigger the click, and remove it
            document.body.appendChild(a);

            // Trigger the download by simulating a click
            a.click();
            a.remove();

            // Revoke the object URL to free up memory
            window.URL.revokeObjectURL(url);
        } catch (error) {

            // Log the error if download fails
            console.error('Error downloading QR code:', error);
        } finally {
            // Reset the loading state after the operation is complete
            setLoading(false);
        }
    }

    // Show loading until mounted and params are loaded
    if (!mounted) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    return (
        <div className='h-full w-full'>
            <div className="h-full w-full flex justify-center pt-10">
                <div className="h-full md:w-4xl flex flex-col gap-3 bg-white p-6 rounded-md border-[0.5px] border-zinc-300">

                    {/* Header section with title and description */}
                    <div className="flex flex-col gap-1">
                        <h1 className="text-2xl font-semibold text-zinc-800 ">QR Code</h1>
                        <p className="text-zinc-600 pb-2 ">
                            Scan the QR code to access the destination URL.
                        </p>
                    </div>

                    {/* Form section for displaying the QR code and destination URL */}
                    <div className='flex flex-col md:flex-row gap-5 justify-between w-full'>
                        <div className=" flex flex-col gap-3 rounded-md md:w-xl ">
                            <label className="text-sm font-medium text-zinc-700">Destination URL</label>
                            <input type='text' placeholder="https://your-long-url.com" value={destUrl} readOnly
                                className="border text-sm md:text-base border-zinc-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                            />

                            <label className="text-sm font-medium text-zinc-700">Short Link</label>
                            <input type='text' placeholder="(optional)" value={`https://cuttely.vercel.app/api/${shortCode}`} readOnly
                                className="border text-sm md:text-base border-zinc-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                            />

                            {/* Display error message if there is an error */}
                            {!qrCodeUrl && (
                                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                                    Failed to generate QR Code.
                                </div>
                            )}

                            {/* Footer section with action buttons */}
                            <div className='w-full flex justify-between mt-2'>
                                <Link href='/dashboard/links'
                                    className="text-sm md:text-base w-fit flex items-center gap-2 px-4 py-2  border border-zinc-500 rounded-md hover:bg-zinc-100 transition duration-200 cursor-pointer">
                                    Cancel
                                </Link>
                                <button
                                    className="text-sm md:text-base w-fit flex items-center gap-2 bg-zinc-900 text-white px-4 py-2 rounded-md hover:bg-zinc-800 transition duration-200 cursor-pointer"
                                    onClick={handleDownload}
                                    disabled={loading || !qrCodeUrl}>
                                    {loading ? 'Downloading...' : 'Download'}
                                </button>
                            </div>
                        </div>
                        
                        {/* Display the generated QR code */}
                        <div>
                            <div className="flex justify-center border border-zinc-300 bg-zinc-100 p-4 rounded-xl">
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

export default QRCodeGenerator;