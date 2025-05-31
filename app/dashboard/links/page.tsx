'use client'

import { Search, Plus, Pencil, Copy, Trash2, MousePointerClick, Calendar, QrCode } from "lucide-react"
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CardShimmer from '@/components/CardShimmer'

const Links = () => {

  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const router: any = useRouter();

  const handleEdit = (url: any) => {
    const query = new URLSearchParams({
      id: url.id,
      destUrl: url.originalUrl,
      shortCode: url.shortCode
    }).toString();

    router.push(`/dashboard/links/edit?${query}`);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/protected/delete?id=${id}`);
      setUrls(urls.filter((url: any) => url.id !== id));
    } catch (error) {
      console.error('Error deleting URL:', error);
    }
  }

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  };

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/protected/my-urls');
        setUrls(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching URLs:', error);
      }
    };

    fetchUrls();
  }, []);


  return (
    <div className="h-full w-full flex justify-center pt-10 ">
      <div className="h-full w-4xl flex flex-col gap-3 ">

        <div className="flex flex-col gap-1 pb-4">
          <h1 className="text-2xl font-semibold text-zinc-800 ">Links</h1>
          <p className="text-zinc-500 ">Create and manage your short links</p>
        </div>

        <div className="flex justify-between items-center bg-zinc-100 p-4 rounded-md ">
          <div className="w-2/5 flex items-center gap-1 border border-zinc-400 rounded px-3 bg-white">
            <Search size={20} strokeWidth={1} className="text-zinc-500" />
            <input type="text" placeholder="Search links..." className="w-full h-10 rounded-md px-2 text-zinc-700 focus:outline-none focus:border-sky-500" />
          </div>
          <div className="">
            <Link href='/dashboard/links/create' className="flex items-center gap-2 bg-zinc-900 text-white px-4 py-2 rounded-md hover:bg-zinc-800 transition duration-200">
              <Plus size={20} strokeWidth={2} className="text-white" />Create Link
            </Link>
          </div>
        </div>

        {loading && <CardShimmer />}

        <div className="flex flex-col gap-2 h-96 overflow-auto overflow-x-clip">
          {
            urls.length > 0 ?
              urls.map((url: any) => (
                <div key={url.id} className=" flex gap-3 justify-between border border-zinc-300 p-4 rounded bg-white">
                  <div className="flex gap-3">
                    <img src={`https://www.google.com/s2/favicons?domain=${url.originalUrl}&sz=64`} alt="favicon" className="h-10 w-10 mt-1" />
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-col gap-1">
                        <a href={`http://localhost:3000/api/redirect/${url.shortCode}`} className=" text-bf-blue  hover:underline">{`http://localhost:3000/api/redirect/${url.shortCode}`}</a>
                        <a href={url.originalUrl} className="text-zinc-700 hover:underline text-sm">{url.originalUrl}</a>
                      </div>
                      <div className="flex gap-4">
                        <p className="flex items-center gap-2 text-sm text-zinc-600"><Calendar size={20} strokeWidth={1} className=" text-zinc-600" /> {new Date(url.createdAt).toLocaleDateString('en-US', {
                          month: 'short', day: 'numeric', year: 'numeric',
                        })}</p>
                        <p className="flex items-center gap-2 text-sm text-zinc-600"><MousePointerClick size={24} strokeWidth={1} className=" text-zinc-600" /> {url.clicks}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 relative mr-3">

                    <div className="relative group">
                      <Link href={`/dashboard/links/qrcode?id=${url.id}&destUrl=${url.originalUrl}&shortCode=${url.shortCode}`}>
                        <QrCode size={26} strokeWidth={2}
                          className="border text-zinc-700 border-zinc-400 p-1 cursor-pointer rounded hover:bg-zinc-100"
                        />
                      </Link>
                      <span className="absolute top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                        QR Code
                      </span>
                    </div>

                    <div className="relative group">
                      <Copy size={26} strokeWidth={2}
                        className="border text-zinc-700 border-zinc-400 p-1 cursor-pointer rounded hover:bg-zinc-100"
                        onClick={() => handleCopy(`http://localhost:3000/api/redirect/${url.shortCode}`)}
                      />
                      <span className="absolute top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                        Copy URL
                      </span>
                    </div>

                    <div className="relative group">
                      <Pencil size={26} strokeWidth={2}
                        className="border text-zinc-700 border-zinc-400 p-1 cursor-pointer rounded hover:bg-zinc-100"
                        onClick={() => handleEdit(url)}
                      />
                      <span className="absolute top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                        Edit Link
                      </span>
                    </div>

                    <div className="relative group">
                      <Trash2 size={26} strokeWidth={2}
                        className="border text-zinc-700 border-zinc-400 p-1 cursor-pointer rounded hover:bg-zinc-100"
                        onClick={() => handleDelete(url.id)}
                      />
                      <span className="absolute top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                        Delete Link
                      </span>
                    </div>
                  </div>

                </div>
              ))
              : null
          }
        </div>

      </div>
    </div>
  )
}

export default Links
