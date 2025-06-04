"use client"
import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

const Create = () => {

    // State to hold the custom code input for the short link
    const [customCode, setCustomCode] = useState('');
    
    // State to hold the original URL input
    const [originalUrl, setOriginalUrl] = useState('');

    // State to hold any error messages during the link creation process
    const [error, setError] = useState('');

    // State to manage loading state while the link is being created
    const [loading, setLoading] = useState(false);

    // Using Next.js router for navigation
    const router = useRouter();

    // Function to handle the form submission for creating a new link
    const handleSubmit = async () => {

        setError('');
        setLoading(true);

        // Validate the original URL input
        try {

            // Check if the original URL is empty or contains only whitespace
            if (!originalUrl.trim()) {
                setError("URL is required.");
                return;
            }
            // Check if the original URL is a valid URL format
            const res = await axios.post("/api/protected/create", {
                originalUrl, customCode
            });

            // If the response status is not 200, set an error message
            if (res.status !== 200) {
                setError(res.data.error || "Something went wrong.");
                return;
            }

            // If the link is created successfully, redirect to the links dashboard
            router.push('/dashboard/links');
        }
        catch (err) {

            // Log the error and set an error message
            console.error("An error occurred:", err);
            setError("Something went wrong while connecting to the server.");
        } finally {

            // Reset the loading state after the operation is complete
            setLoading(false);
        }
    }

    return (
        <div>
            <div className="h-full w-full flex justify-center pt-10">
                <div className="h-full w-4xl flex flex-col gap-3 bg-white p-6 rounded-md border-[0.5px] border-zinc-300">

                    {/* Header section with title and description */}
                    <div className="flex flex-col gap-1">
                        <h1 className="text-2xl font-semibold text-zinc-800 ">Create a Link</h1>
                        <p className="text-zinc-600 text-sm md:text-base pb-3">Don't worry, you can edit this later.</p>
                    </div>

                    {/* Form section for creating a new link */}
                    <div className="flex flex-col gap-3 rounded-md">
                        <label className="text-sm font-medium text-zinc-700">Destination URL</label>
                        <input type='text' placeholder="https://your-long-url.com" value={originalUrl} onChange={(e) => { setOriginalUrl(e.target.value) }}
                            className="border text-sm md:text-base border-zinc-300 rounded-md px-3 py-2 focus:outline-none focus:border-sky-500"
                        />

                        <label className="text-sm font-medium text-zinc-700">Short Link</label>
                        <input type='text' placeholder="(optional)" value={customCode} onChange={(e) => { setCustomCode(e.target.value) }}
                            className="border text-sm md:text-base border-zinc-300 rounded-md px-3 py-2 focus:outline-none focus:border-sky-500"
                        />

                        {/* Display error message if there is an error */}
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                                {error}
                            </div>
                        )}

                        {/* Footer section with action buttons */}
                        <div className="flex justify-between pt-4">
                            <Link href='/dashboard/links'
                                className="flex text-sm md:text-base items-center gap-2 px-4 py-2 border border-zinc-500 rounded-md hover:bg-zinc-100 transition duration-200">
                                Cancel
                            </Link>
                            <button
                                className="flex text-sm md:text-base items-center gap-2 bg-zinc-900 text-white px-4 py-2 rounded-md hover:bg-zinc-800 transition duration-200 cursor-pointer "
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