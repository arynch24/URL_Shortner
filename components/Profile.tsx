'use client'
import React from 'react'
import Image from 'next/image'
import { ChevronDown, ChevronUp, LogOut } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import { useState } from 'react'

const Profile = () => {
    const { data: session } = useSession();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>

            <div className="flex items-center gap-2 border p-2 border-zinc-300 rounded-md">
                <div className="w-8 h-8 flex items-center justify-center border border-zinc-500 rounded-full bg-zinc-100 text-zinc-700">
                    {session?.user?.image ? (
                        <Image
                            src={session.user.image}
                            alt="user"
                            width={30}
                            height={30}
                            className="rounded-full"
                        />
                    ) : (
                        session?.user?.name?.[0] || '?'
                    )}
                </div>
                <p className='text-sm'>{session?.user?.name}</p>
                {
                    isOpen ?
                        <ChevronUp size={16} className='text-zinc-500' onClick={() => setIsOpen(!isOpen)} /> :
                        <ChevronDown size={16} className='text-zinc-500' onClick={() => setIsOpen(!isOpen)} />
                }

            </div>
            {isOpen && (
                <div className="absolute right-10 mt-2 w-xs bg-white border border-zinc-300 rounded-md shadow-lg z-10">
                    <ul className="py-1">
                        <li className="flex items-center gap-2 px-4 py-2 hover:bg-zinc-100 cursor-pointer border-b border-zinc-400">
                            <div className="w-8 h-8 flex items-center justify-center border border-zinc-500 rounded-full bg-zinc-100 text-zinc-700">
                                {session?.user?.image ? (
                                    <Image
                                        src={session.user.image}
                                        alt="user"
                                        width={30}
                                        height={30}
                                        className="rounded-full"
                                    />
                                ) : (
                                    session?.user?.name?.[0] || '?'
                                )}
                            </div>
                            <div className='flex flex-col'>
                                <span className="text-sm">{session?.user?.name}</span>
                                <span className="text-sm">{session?.user?.email}</span>
                            </div>
                        </li>

                        <li className="flex items-center text-sm text-red-500 gap-2 px-4 py-2 hover:bg-zinc-100 cursor-pointer" onClick={() => signOut()}>
                            <LogOut size={18} />Logout
                        </li>
                    </ul>
                </div>
            )}
        </div>
    )
}

export default Profile
