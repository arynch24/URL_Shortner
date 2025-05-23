'use client'

import { Search, Plus, Pencil, Copy, Trash2, MousePointerClick, Calendar } from "lucide-react"
import { useEffect, useState } from "react";
import axios from "axios";

const page = () => {

  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const response = await axios.get('/api/protected/my-urls');
        setUrls(response.data);
      } catch (error) {
        console.error('Error fetching URLs:', error);
      }
    };

    fetchUrls();
  }, []);


  return (
    <div className="h-full w-full flex justify-center pt-10 ">
      <div className="h-full w-4xl flex flex-col gap-3 ">

        <h1 className="text-2xl font-semibold text-zinc-800 ">Links</h1>
        <p className="text-zinc-500 ">Create and manage your short links</p>

        <div className="flex justify-between items-center bg-zinc-100 p-4 rounded-md ">
          <div className="w-2/5 flex items-center gap-1 border border-zinc-400 rounded px-3 bg-white">
            <Search size={20} strokeWidth={1} className="text-zinc-500" />
            <input type="text" placeholder="Search links..." className="w-full h-10 rounded-md px-2 text-zinc-700 focus:outline-none focus:border-sky-500" />
          </div>
          <div className="">
            <button className="flex items-center gap-2 bg-zinc-900 text-white px-4 py-2 rounded-md hover:bg-zinc-800 transition duration-200">
              <Plus size={20} strokeWidth={2} className="text-white" />Create Link
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
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
                  <div className="flex gap-2 ">
                    <Copy size={26} strokeWidth={2} className="border text-zinc-700 border-zinc-400 p-1 cursor-pointer rounded hover:bg-zinc-100" />
                    <Pencil size={26} strokeWidth={2} className="border text-zinc-700 border-zinc-400 p-1 cursor-pointer rounded hover:bg-zinc-100" />
                    <Trash2 size={26} strokeWidth={2} className="border text-zinc-700 border-zinc-400 p-1 cursor-pointer rounded hover:bg-zinc-100" />
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

export default page
