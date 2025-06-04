'use client'

import { Search, Plus, Pencil, Copy, Trash2, MousePointerClick, Calendar, QrCode } from "lucide-react"
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CardShimmer from '@/components/CardShimmer'

const Links = () => {

  // State to hold the list of URLs
  const [urls, setUrls] = useState([]);

  // State to manage loading state and loading text
  const [loading, setLoading] = useState(false);

  // State to hold the loading text for actions like delete or copy
  const [loadingText, setLoadingText] = useState('');

  // Using Next.js router for navigation
  const router: any = useRouter();

  // Function to handle editing a URL
  const handleEdit = (url: any) => {
    // Construct the query parameters for the edit URL
    const query = new URLSearchParams({
      id: url.id,
      destUrl: url.originalUrl,
      shortCode: url.shortCode
    }).toString();

    // Navigate to the edit page with the query parameters
    router.push(`/dashboard/links/edit?${query}`);
  };

  // Function to handle deleting a URL
  const handleDelete = async (id: string) => {
    try {
      // Set loading text to indicate deletion process
      setLoadingText('Deleting URL...');

      // Make a DELETE request to the API to delete the URL
      await axios.delete(`/api/protected/delete?id=${id}`);

      // Filter out the deleted URL from the state
      setUrls(urls.filter((url: any) => url.id !== id));
    } catch (error) {
      // Log the error if the deletion fails
      console.error('Error deleting URL:', error);
    }
    finally {
      // Reset loading text after the operation is complete
      setLoadingText('');
    }
  }

  // Function to handle copying the URL to clipboard
  const handleCopy = async (text: string) => {
    try {
      // Set loading text to indicate copying process
      setLoadingText('Copying URL...');

      // Use the Clipboard API to copy the text
      await navigator.clipboard.writeText(text);
    } catch (err) {
      // Log the error if copying fails
      console.error('Failed to copy!', err);
    }

    // Reset loading text after a short delay to indicate completion
    finally {
      setTimeout(() => {
        setLoadingText('');
      }, 1000);
    }
  };

  // Fetch the URLs from the API when the component mounts
  useEffect(() => {
    const fetchUrls = async () => {
      try {
        setLoading(true);

        // Make a GET request to fetch the user's URLs
        const response = await axios.get('/api/protected/my-urls');
        setUrls(response.data);
        setLoading(false);
      } catch (error) {

        // Set loading to false and log the error if fetching fails
        setLoading(false);
        console.error('Error fetching URLs:', error);
      }
    };

    // Call the fetchUrls function to load URLs when the component mounts
    fetchUrls();
  }, []);


  return (
    <div className="h-full w-full flex justify-center pt-10">
      <div className="h-full md:w-4xl flex flex-col gap-3 ">

        {/* Header section with title and description */}
        <div className="flex flex-col gap-1 pb-4">
          <h1 className="text-2xl font-semibold text-zinc-800 ">Links</h1>
          <p className="text-zinc-500 ">Create and manage your short links</p>
        </div>

        {/* Search and Create Link section */}
        <div className="flex justify-between items-center bg-zinc-100 p-4 rounded-md ">
          <div className="w-2/5 flex items-center gap-1 border border-zinc-400 rounded px-3 bg-white">
            <Search size={20} strokeWidth={1} className="text-zinc-500" />
            <input type="text" placeholder="Search links..." className="w-full text-sm md:text-base  h-8 md:h-10 rounded-md px-2 text-zinc-700 focus:outline-none focus:border-sky-500" />
          </div>
          <div className="">
            <Link href='/dashboard/links/create' className="flex text-sm md:text-base items-center gap-2 bg-zinc-900 text-white px-3 md:px-4 py-2 rounded-md hover:bg-zinc-800 transition duration-200">
              <Plus size={20} strokeWidth={2} className="text-white" />Create Link
            </Link>
          </div>
        </div>

        {/* Loading state while fetching URLs */}
        {loading && <CardShimmer />}

        {/* List of URLs */}
        <div className="flex flex-col gap-2 h-96 overflow-auto overflow-x-clip">
          {
            urls.length > 0 ?
              urls.map((url: any) => (
                <div key={url.id} className="w-full flex flex-col md:flex-row gap-5 md:gap-3 justify-between border border-zinc-300 p-4 rounded bg-white">
                  <div className="w-full flex gap-3 min-w-0">
                    <img src={`https://www.google.com/s2/favicons?domain=${url.originalUrl}&sz=64`} alt="favicon" className="h-8 md:h-10 md:w-10 mt-1 flex-shrink-0" />
                    <div className="w-full flex flex-col gap-3 min-w-0">
                      <div className="w-full flex flex-col gap-1 min-w-0">
                        <a
                          href={`https://cuttely.vercel.app/api/${url.shortCode}`}
                          className="text-bf-blue hover:underline truncate block"
                          title={`https://cuttely.vercel.app/api/${url.shortCode}`}
                        >
                          {`https://cuttely.vercel.app/api/${url.shortCode}`}
                        </a>
                        <a
                          href={url.originalUrl}
                          className="text-zinc-700 hover:underline text-sm truncate block"
                          title={url.originalUrl}
                        >
                          {url.originalUrl}
                        </a>
                      </div>
                      <div className="flex flex-wrap gap-4">
                        <p className="flex items-center gap-2 text-sm text-zinc-600 whitespace-nowrap">
                          <Calendar size={20} strokeWidth={1} className="text-zinc-600" />
                          {new Date(url.createdAt).toLocaleDateString('en-US', {
                            month: 'short', day: 'numeric', year: 'numeric',
                          })}
                        </p>
                        <p className="flex items-center gap-2 text-sm text-zinc-600 whitespace-nowrap">
                          <MousePointerClick size={24} strokeWidth={1} className="text-zinc-600" />
                          {url.clicks}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action buttons for QR Code, Copy, Edit, and Delete */}
                  <div className="flex gap-2 relative ml-11 md:ml-0 md:mr-3 flex-shrink-0">

                    {/* QR Code button */}
                    <div className="relative group">
                      <Link href={`/dashboard/links/qrcode?id=${url.id}&destUrl=${url.originalUrl}&shortCode=${url.shortCode}`}>
                        <QrCode size={26} strokeWidth={2}
                          className="border text-zinc-700 border-zinc-400 p-1 cursor-pointer rounded hover:bg-zinc-100"
                        />
                      </Link>
                      <span className="absolute top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                        QR Code
                      </span>
                    </div>

                    {/* Copy, Edit, and Delete buttons */}
                    <div className="relative group">
                      <Copy size={26} strokeWidth={2}
                        className="border text-zinc-700 border-zinc-400 p-1 cursor-pointer rounded hover:bg-zinc-100"
                        onClick={() => handleCopy(`https://cuttely.vercel.app/api/${url.shortCode}`)}
                      />
                      <span className="absolute top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                        Copy URL
                      </span>
                    </div>

                    <div className="relative group">
                      <Pencil size={26} strokeWidth={2}
                        className="border text-zinc-700 border-zinc-400 p-1 cursor-pointer rounded hover:bg-zinc-100"
                        onClick={() => handleEdit(url)}
                      />
                      <span className="absolute top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                        Edit Link
                      </span>
                    </div>

                    <div className="relative group">
                      <Trash2 size={26} strokeWidth={2}
                        className="border text-zinc-700 border-zinc-400 p-1 cursor-pointer rounded hover:bg-zinc-100"
                        onClick={() => handleDelete(url.id)}
                      />
                      <span className="absolute top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                        Delete Link
                      </span>
                    </div>
                  </div>

                </div>
              ))
              : null
          }
        </div>

        {/* Display loading text if any action is in progress */}
        {loadingText && (
          <div className="flex items-center justify-center mt-4  ">
            <p className="text-zinc-600 border rounded-full px-4 py-2 text-bf-blue ">{loadingText}</p>
          </div>
        )}

      </div>
    </div>
  )
}

export default Links
