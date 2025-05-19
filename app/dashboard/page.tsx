"use client"
import { useState } from "react";

const page = () => {

    const [customCode, setCustomCode] = useState('');
    const [originalUrl, setOriginalUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        setError('');
        setShortUrl('');

        try {
            const res = await fetch("/api/protected/shorturl", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ originalUrl, customCode })
            });

            const data = await res.json(); // parse JSON from response

            if (!res.ok) {
                setError(data.error || "Something went wrong.");
                return;
            }

            setShortUrl(data.shortUrl);
        }
        catch (err) {
            console.error("An error occurred:", err);
            setError("Something went wrong while connecting to the server.");
        }


    }
    return (
        <div className="flex flex-col gap-3">
            <input type='text' placeholder="Enter long URL" value={originalUrl} onChange={(e) => { setOriginalUrl(e.target.value) }} />
            <input type='text' placeholder="Enter Custom Code" value={customCode} onChange={(e) => { setCustomCode(e.target.value) }} />
            <button className="border border-zinc-600" onClick={handleSubmit}>Submit URL</button>
            <p>SHORT URL :{shortUrl}</p>
            <p className="text-red-700">Error:{error}</p>
        </div>
    )
}

export default page
