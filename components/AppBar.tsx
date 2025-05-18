"use client"

import { signIn, signOut } from "next-auth/react"
import { useSession } from "next-auth/react"

const AppBar = () => {
    const session = useSession();
    return (
        <div className="flex flex-col gap-4 p-5">
            <button onClick={() => signIn('credentials')} className="border border-white">signIn</button>
            <br />
            <button onClick={() => signOut()} className="border border-white" >signOut</button>

            <p>
                {JSON.stringify(session)}
            </p>
        </div>
    )
}

export default AppBar;
