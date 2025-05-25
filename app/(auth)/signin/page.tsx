'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { CircleAlert } from 'lucide-react';

const SigninPage = () => {
    const router = useRouter();
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSignIn = async () => {
        setError('');
        const res = await signIn('credentials', {
            redirect: false,
            email: form.email,
            password: form.password,
        });

        if (res?.ok) {
            router.push('/dashboard');
        }

        if (res?.error) {
            setError(res.error);
        }
    }

    return (
        <div className='h-screen w-full flex items-center'>
            <div className='h-full w-3/5 flex flex-col justify-center text-zinc-800 gap-4 max-w-sm mx-auto'>
                <div className='flex flex-col gap-2 pb-3'>
                    <h1 className='font-bold text-3xl'>Create your account</h1>
                    <p className='text-sm flex gap-1'>
                        Already have an account?
                        <a className='text-blue-500 cursor-pointer hover:text-blue-700 underline' onClick={() => router.push('signup')}>Sign Up</a>
                    </p>
                </div>
                <button className='w-full flex items-center gap-2 justify-center p-2 border border-zinc-300 rounded-md text-md mb-4 cursor-pointer hover:bg-zinc-100 hover:border-zinc-500'
                    onClick={() => signIn('google', {
                        callbackUrl: '/dashboard/links'
                    })}>
                    <img src="https://cdn-icons-png.flaticon.com/128/281/281764.png" alt="GitHub Icon" className="w-4 h-4" />
                    Continue with Google
                </button>

                <div className='flex gap-2 items-center'>
                    <div className='h-[0.5px] w-full bg-zinc-600' />OR
                    <div className='h-[0.5px] w-full bg-zinc-600' />
                </div>
                <div className="flex justify-center items-center">
                    <div className="w-full">
                        <h3 className="font-semibold text-md mb-1 text-left">
                            Email
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
                        {error && <span className='flex items-start gap-1 text-red-500 text-sm transition-colors py-2 pb-3'><CircleAlert size={16} className='mt-1'/>{error}</span>}
                        <div onClick={handleSignIn}>
                            <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-700">
                                Sign In
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
};

export default SigninPage;