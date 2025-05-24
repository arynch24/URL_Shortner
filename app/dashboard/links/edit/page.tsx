"use client"
import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const page = () => {

    const router = useRouter();
    const searchParams = useSearchParams();

    const id = searchParams.get('id');
    const destUrl = searchParams.get('destUrl');
    const shortCode = searchParams.get('shortCode');

    const [customCode, setCustomCode] = useState(shortCode || '');
    const [originalUrl, setOriginalUrl] = useState(destUrl || '');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        try {
            setError('');
            setLoading(true);
            const res = await axios.patch('/api/protected/update', {
                id,
                shortCode: customCode,
                originalUrl
            });

            if (res.status !== 200) {
                setError(res.data.error || "Something went wrong.");
                return;
            }

            setError('');
            router.push('/dashboard/links');
        }
        catch (err) {
            console.error("An error occurred:", err);
            setError("Something went wrong while connecting to the server.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <div className="h-full w-full flex justify-center pt-10">
                <div className="h-full w-4xl flex flex-col gap-3 bg-white p-6 rounded-md border-[0.5px] border-zinc-300">

                    <div className="flex flex-col gap-1">
                        <h1 className="text-2xl font-semibold text-zinc-800 ">Edit Link</h1>
                        <p className="text-zinc-600 ">Hope you not worried, you can edit this now.</p>
                    </div>

                    <div className="flex flex-col gap-3 rounded-md">
                        <label className="text-sm font-medium text-zinc-700">Destination URL</label>
                        <input type='text' placeholder="https://your-long-url.com" value={originalUrl} onChange={(e) => { setOriginalUrl(e.target.value) }}
                            className="border border-zinc-300 rounded-md px-3 py-2 focus:outline-none focus:border-sky-500"
                        />

                        <label className="text-sm font-medium text-zinc-700">Short Link</label>
                        <input type='text' placeholder="(optional)" value={customCode} onChange={(e) => { setCustomCode(e.target.value) }}
                            className="border border-zinc-300 rounded-md px-3 py-2 focus:outline-none focus:border-sky-500"
                        />

                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                                {error}
                            </div>
                        )}

                        <div className="flex justify-between pt-4">
                            <Link href='/dashboard/links'
                                className="flex items-center gap-2 px-4 py-2 border border-zinc-500 rounded-md hover:bg-zinc-100 transition duration-200">
                                Cancel
                            </Link>
                            <button
                                className="flex items-center gap-2 bg-zinc-900 text-white px-4 py-2 rounded-md hover:bg-zinc-800 transition duration-200 cursor-pointer"
                                onClick={handleSave}
                                disabled={loading}>
                                {loading ? 'Saving...' : 'Save'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page;