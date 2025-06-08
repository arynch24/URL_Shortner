"use client"
import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

const Edit = () => {

    // Using Next.js router for navigation
    const router = useRouter();

    // State to hold the ID of the link being edited
    const [id, setId] = useState('');
    
    // State to hold the custom code input for the short link
    const [customCode, setCustomCode] = useState('');

    // State to hold the original URL input
    const [originalUrl, setOriginalUrl] = useState('');

    // State to hold any error messages during the link update process
    const [error, setError] = useState('');

    // State to manage loading state while the link is being updated
    const [loading, setLoading] = useState(false);

    // State to manage the mounted state of the component
    const [mounted, setMounted] = useState(false);


    // Solves the issue of deployment where the component tries to access window before it is mounted
    // Effect to extract URL parameters and set initial state values
    useEffect(() => {

        // Extract URL parameters from the current window location
        const urlParams = new URLSearchParams(window.location.search);

        // Set the state values based on the URL parameters
        setId(urlParams.get('id') || '');
        setOriginalUrl(urlParams.get('destUrl') || '');
        setCustomCode(urlParams.get('shortCode') || '');
        setMounted(true);
    }, []);

    // Function to handle the form submission for updating an existing link
    const handleSave = async () => {
        try {

            setError('');
            setLoading(true);

            // Validate the original URL input
            const res = await axios.patch('/api/protected/update', {
                id,
                shortCode: customCode,
                originalUrl
            });

            // If the response status is not 200, set an error message
            if (res.status !== 200) {
                setError(res.data.error || "Something went wrong.");
                return;
            }

            // If the link is updated successfully, redirect to the links dashboard
            setError('');
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

    // If the component is not mounted, show a loading state
    if (!mounted) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    return (
        <div>
            <div className="h-full w-full flex justify-center pt-10">
                <div className="h-full w-4xl flex flex-col gap-3 bg-white p-6 rounded-md border-[0.5px] border-zinc-300">

                    {/* Header section with title and description */}
                    <div className="flex flex-col gap-1">
                        <h1 className="text-2xl font-semibold text-zinc-800 ">Edit Link</h1>
                        <p className="text-zinc-600 text-sm md:text-base pb-3">Hope you not worried, you can edit this now.</p>
                    </div>

                    {/* Form section for editing an existing link */}
                    <div className="flex flex-col gap-3 rounded-md">
                        <label className="text-sm font-medium text-zinc-700">Destination URL</label>
                        <input type='text' placeholder="https://your-long-url.com" value={originalUrl} onChange={(e) => { setOriginalUrl(e.target.value) }}
                            className="border text-sm md:text-base border-zinc-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                        />

                        <label className="text-sm font-medium text-zinc-700">Short Link</label>
                        <div className="flex items-center gap-2">
                            <input type='text' placeholder="https://cuttely.vercel.app/api" value={`https://cuttely.vercel.app/api`} readOnly
                                className="border text-sm md:text-base border-zinc-300 bg-zinc-100 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 w-1/2 cursor-not-allowed"
                            />
                            /
                            <input type='text' placeholder="(optional)" value={customCode} onChange={(e) => { setCustomCode(e.target.value) }}
                                className="w-1/2 border text-sm md:text-base border-zinc-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                            />
                        </div>

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
                                className="flex text-sm md:text-base items-center gap-2 bg-zinc-900 text-white px-4 py-2 rounded-md hover:bg-zinc-800 transition duration-200 cursor-pointer"
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


export default Edit;