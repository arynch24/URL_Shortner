'use client'

import { Ghost, Zap, Eye, Clipboard, ScanQrCode, ChartNoAxesCombined } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const Home = () => {

    // Using Next.js router for navigation
    const router = useRouter();

    // Using NextAuth to get the session data
    const { data: session, status } = useSession();

    return (
        <div className="flex flex-wrap gap-16 md:gap-0 justify-between p-10 md:p-26">

            {/* Left side section with text content */}
            <div className='md:max-w-3xl '>
                <div className="flex flex-col gap-10">
                    <div className="text-xs md:text-md  w-fit flex items-center text-zinc-700 gap-2 border border-zinc-400 px-4 py-1 rounded-full">
                        <Ghost size={20} className='text-blue-500' />Introducing Cuttly - Smart, short links made simple.
                    </div>
                    <div className="flex flex-col gap-2">
                        <h1 className="text-3xl md:text-6xl text-zinc-800 font-bold">Create short links</h1>
                        <h1 className="text-3xl md:text-6xl font-bold pb-4 bg-gradient-to-r from-sky-500 to-blue-950 bg-clip-text text-transparent">with superpowers</h1>
                        <p className="text-zinc-700 md:w-lg text-sm md:text-lg">
                            Cuttly is a URL shortening service that lets you create custom short links, track clicks, and manage your links easily — perfect for marketers, businesses, or anyone sharing links.
                        </p>
                    </div>
                    <div >
                        <button className="text-xs md:text-md bg-sky-600 text-white px-6 py-3 rounded-md hover:bg-sky-700 cursor-pointer transition-colors" onClick={() => status ? router.push('/dashboard/links') : router.push('/signin')}>Get Started</button>
                    </div>
                </div>
            </div>

            {/* Right side section with an image or illustration */}
            <div className='md:w-lg flex flex-col gap-4 md:p-6 md:-mt-8'>
                <div className='flex flex-col gap-6 text-zinc-600 border border-zinc-300 rounded-lg p-6'>
                    <div className='text-sm md:text-md flex items-center gap-3'>
                        <Zap size={32} className=' text-bf-blue rounded-md bg-sky-200 p-2' />
                        Try it out
                    </div>
                    <div className='flex flex-col gap-3' onClick={() => router.push('/dashboard/links')}>
                        <div className='flex justify-between px-4 py-2 border border-zinc-300 rounded-md '>
                            <input placeholder='Paste your long URL here...' className='text-xs md:text-md w-full focus:outline-none' />
                            <Clipboard size={20} className='text-zinc-400' />
                        </div>
                        <button className='text-xs md:text-md w-full text-center text-zinc-600 bg-zinc-100 rounded-md p-2'>Shorten URL</button>
                    </div>
                    <div className='flex justify-between items-center gap-10 md:gap-0 mt-5'>
                        <div className='text-xs md:text-md flex gap-1 font-semibold items-center'>
                            <Image
                                src='https://res.cloudinary.com/dr8ubbrmp/image/upload/v1748000628/shoo4vbiqfjyzkmk3hyl.png'
                                className="h-5 w-5 md:w-6 md:h-6"
                                alt="logo"
                                width={36}
                                height={36}
                            />
                            cuttly/try:
                        </div>
                        <div className='flex md:gap-4 items-center'>
                            <div className='text-xs md:text-sm flex gap-2'><Eye size={20} className='text-bf-blue' /> 62.6K Clicks</div>
                            <div className='text-xs md:text-sm bg-zinc-200 p-1 rounded-lg'>Copy</div>
                        </div>
                    </div>
                </div>

                {/* Features section showcasing different functionalities */}
                <div className='flex flex-col md:flex-row gap-4'>
                    <div className='md:w-1/2 border border-zinc-300 rounded-lg p-6'>
                        <ChartNoAxesCombined size={32} className='text-bf-blue mb-4 bg-zinc-100 rounded p-1' />
                        <h1 className='text-lg font-semibold text-zinc-800'>Analytics</h1>
                        <p className='text-zinc-600 text-sm'>Track your link performance with detailed analytics.</p>
                    </div>
                    <div className='md:w-1/2 border border-zinc-300 rounded-lg p-6'>
                        <ScanQrCode size={32} className='text-bf-blue mb-4 bg-zinc-100 rounded p-1' />
                        <h1 className='text-lg font-semibold text-zinc-800'>QR Codes</h1>
                        <p className='text-zinc-600 text-sm'>Generate QR codes for your short links.</p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Home
