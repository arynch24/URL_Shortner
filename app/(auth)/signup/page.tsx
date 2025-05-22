'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

const SignupPage = () => {
    const router = useRouter();
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setError('');

            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error);
                return;
            }

            // Auto login after signup so that to get the session otherwise only user details will be only stored in db 
            await signIn('credentials', {
                email: form.email,
                password: form.password,
                callbackUrl: '/dashboard', // redirect after login
            });
        }
        catch (error: any) {
            setError(error.message || "Something went wrong");
        }

    };

    return (
        <div className='h-[calc(100vh-4rem)] w-full flex items-center justify-center'>
            <div className='h-full w-3/5 flex flex-col justify-center text-zinc-800 gap-4 max-w-sm mx-auto'>
                <div className='flex flex-col gap-2 pb-3'>
                    <h1 className='font-bold text-3xl'>Create your account</h1>
                    <p className='text-sm flex gap-1'>
                        Already have an account?
                        <a className='text-blue-500 cursor-pointer hover:text-blue-700 underline' onClick={() => router.push('signin')}>Log in</a>
                    </p>
                </div>
                <button className='w-full flex items-center gap-2 justify-center p-2 border border-zinc-300 rounded-md text-md mb-4 cursor-pointer hover:bg-zinc-100 hover:border-zinc-500' onClick={() => signIn('google')}>
                    <img src="https://cdn-icons-png.flaticon.com/128/281/281764.png" alt="GitHub Icon" className="w-4 h-4" />
                    Continue with Google
                </button>

                <div className='flex gap-2 items-center'>
                    <div className='h-[0.5px] w-full bg-zinc-600' />OR
                    <div className='h-[0.5px] w-full bg-zinc-600' />
                </div>
                <div className="flex justify-center items-center">
                    <div className="w-full">
                        <h3 className="font-semibold text-md mb-1 text-left">Name</h3>
                        <input
                            className="w-full p-2 border border-zinc-300 rounded-md text-md focus:outline-none focus:border-zinc-500  mb-4"
                            name='name'
                            type="text"
                            onChange={handleChange}

                        />
                        <h3 className="font-semibold text-md mb-1 text-left">
                            Email
                            {error && <span className='text-red-500 text-sm ml-2 transition-colors'>{error}</span>}
                        </h3>
                        <input
                            className="w-full p-2 border border-zinc-300 rounded-md text-md focus:outline-none focus:border-zinc-500 mb-4"
                            name='email'
                            type="email"
                            onChange={handleChange}
                        />
                        <h3 className="font-semibold text-md mb-1 text-left">Password</h3>
                        <input
                            className="w-full p-2 border border-zinc-300 rounded-md text-md focus:outline-none focus:border-zinc-500 mb-4"
                            name='password'
                            type="password"
                            onChange={handleChange}
                        />
                        <div onClick={handleSubmit}>
                            <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-700">
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-2/5 h-full bg-zinc-300'></div>
        </div>


    );
};

export default SignupPage;

{/* <div className='w-full h-screen flex items-center justify-center'>
            <div className='h-full w-3/5 flex flex-col justify-center text-zinc-800 gap-4 max-w-sm mx-auto'>
                <div className='flex flex-col gap-2'>
                    <h1 className='font-bold text-3xl'>Create your account</h1>
                    <p className='text-sm flex gap-1'>
                        Already have an account?
                        <a className='text-blue-600 cursor-pointer' onClick={() => router.push('signin')}>Log in</a>
                    </p>
                </div>

                <button className='border p-2 cursor-pointer' onClick={() => signIn('google')}>
                    Continue with Google
                </button>

                <div className='flex gap-2 items-center'>
                    <div className='h-[0.5px] w-full bg-zinc-600' />OR
                    <div className='h-[0.5px] w-full bg-zinc-600' />
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input type="text" name="name" placeholder="Name" onChange={handleChange} className="border-1 border-zinc-400 p-2 hover:border-zinc-800 rounded focus:outline-none focus:border-zinc-900" />
                    <input type="email" name="email" placeholder="Email" onChange={handleChange} className="border-[0.5px] p-2" />
                    <input type="password" name="password" placeholder="Password" onChange={handleChange} className="border p-2" />
                    {error && <p className="text-red-500">{error}</p>}
                    <button type="submit" className="bg-black text-white py-2">Sign Up</button>
                </form>
            </div>

            <div className='w-2/5 h-full bg-zinc-300'></div>
        </div> */}