"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import { useState } from "react"

const AppBar = () => {
    const { data: session } = useSession();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignIn = async () => {
        const res = await signIn('credentials', {
            redirect: false,
            email,
            password,
        });

        if (res?.error) {
            setError(res.error);
        }
    }

    return (
        <div className="flex flex-col gap-4 p-5">
            {!session ? (
                <>
                    <input
                        type="text"
                        placeholder="Email"
                        className="text-black p-1"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="text-black p-1"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={handleSignIn} className="border border-zinc-900">Sign In</button>
                    {error && <p className="text-red-400">{error}</p>}
                </>
            ) : (
                <>
                    <p className="text-green-400">Signed in as {session.user?.email}</p>
                    <button onClick={() => signOut()} className="border border-zinc-900">Sign Out</button>
                </>
            )}
        </div>
    )
}

export default AppBar;
