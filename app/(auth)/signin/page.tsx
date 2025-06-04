'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { CircleAlert } from 'lucide-react';

const SigninPage = () => {
    const router = useRouter(); // Next.js router hook to navigate programmatically
    
    // State to hold email and password input values
    const [form, setForm] = useState({ email: '', password: '' });
    // State to hold any error message from sign-in process
    const [error, setError] = useState('');

    // Updates form state whenever input changes
    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Handles sign-in process using next-auth's credentials provider
    const handleSignIn = async () => {
        setError(''); // Clear previous errors
        // Call signIn method, with redirect disabled to handle success/failure manually
        const res = await signIn('credentials', {
            redirect: false,
            email: form.email,
            password: form.password,
        });

        if (res?.ok) {
            // If sign-in is successful, redirect to dashboard
            router.push('/dashboard');
        }

        if (res?.error) {
            // If there was an error, set the error message to display
            setError(res.error);
        }
    }

    return (
        <div className='h-screen w-full flex items-center'>
            <div className='h-full w-full px-6 flex flex-col justify-center text-zinc-800 gap-4 max-w-md mx-auto'>

                {/* Header section */}
                <div className='flex flex-col gap-2 pb-3'>
                    <h1 className='font-bold text-3xl'>Create your account</h1>
                    <p className='text-sm flex gap-1'>
                        Already have an account?
                        {/* Link to signup page */}
                        <a
                          className='text-blue-500 cursor-pointer hover:text-blue-700 underline'
                          onClick={() => router.push('signup')}
                        >
                          Sign Up
                        </a>
                    </p>
                </div>

                {/* Google sign-in button */}
                <button
                    className='w-full flex items-center gap-2 justify-center p-2 border border-zinc-300 rounded-md text-base mb-4 cursor-pointer hover:bg-zinc-100 hover:border-zinc-500'
                    onClick={() => signIn('google', {
                        callbackUrl: '/dashboard/links' // redirect after Google sign-in
                    })}
                >
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/281/281764.png"
                      alt="Google Icon"
                      className="w-4 h-4"
                    />
                    Continue with Google
                </button>

                {/* Divider with "OR" text */}
                <div className='flex gap-2 items-center'>
                    <div className='h-[0.5px] w-full bg-zinc-600' />
                    OR
                    <div className='h-[0.5px] w-full bg-zinc-600' />
                </div>

                {/* Email & Password form */}
                <div className="flex justify-center items-center">
                    <div className="w-full">
                        <h3 className="font-semibold text-base mb-1 text-left">
                            Email
                        </h3>
                        <input
                            className="w-full p-2 border border-zinc-300 rounded-md text-base focus:outline-none focus:border-zinc-500 mb-4"
                            name='email'
                            type="email"
                            onChange={handleChange} // update email state on change
                        />
                        <h3 className="font-semibold text-base mb-1 text-left">Password</h3>
                        <input
                            className="w-full p-2 border border-zinc-300 rounded-md text-base focus:outline-none focus:border-zinc-500 mb-4"
                            name='password'
                            type="password"
                            onChange={handleChange} // update password state on change
                        />
                        {/* Display error message if sign-in fails */}
                        {error && (
                            <span className='flex items-start gap-1 text-red-500 text-sm transition-colors py-2 pb-3'>
                                <CircleAlert size={16} className='mt-1' />
                                {error}
                            </span>
                        )}
                        {/* Sign-in button triggers handleSignIn */}
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
