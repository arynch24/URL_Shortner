"use client"
import { useState } from "react";
import Link from "next/link";
import axios from "axios";

const Create = () => {

    const [customCode, setCustomCode] = useState('');
    const [originalUrl, setOriginalUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setError('');
        setShortUrl('');
        setLoading(true);

        try {
            const res = await axios.post("/api/protected/create", {
                originalUrl, customCode
            });

            if (res.status!== 200) {
                setError(res.data.error || "Something went wrong.");
                return;
            }

            setShortUrl(res.data.shortUrl);
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
                        <h1 className="text-2xl font-semibold text-zinc-800 ">Create a Link</h1>
                        <p className="text-zinc-600 ">Don't worry, you can edit this later.</p>
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

                        {shortUrl && (
                            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
                                <p className="font-medium">Short URL created successfully!</p>
                                <p className="text-sm mt-1">
                                    <span className="font-mono bg-green-100 px-2 py-1 rounded">{shortUrl}</span>
                                </p>
                            </div>
                        )}

                        <div className="flex justify-between pt-4">
                            <Link href='/dashboard/links'
                                className="flex items-center gap-2 px-4 py-2 border border-zinc-500 rounded-md hover:bg-zinc-100 transition duration-200">
                                Cancel
                            </Link>
                            <button
                                className="flex items-center gap-2 bg-zinc-900 text-white px-4 py-2 rounded-md hover:bg-zinc-800 transition duration-200 cursor-pointer "
                                onClick={handleSubmit}
                                disabled={loading || !originalUrl.trim()}>
                                {loading ? 'Creating...' : 'Create Link'}
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Create;