'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { CircleAlert } from 'lucide-react';

const SignupPage = () => {

    // Using Next.js router for navigation
    const router = useRouter();

    // State to hold form data and error messages
    const [form, setForm] = useState({ name: '', email: '', password: '' });

    // State to hold any error messages from the signup process
    const [error, setError] = useState('');

    // Function to handle input changes and update form state
    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Function to handle form submission for signup
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setError('');

            // Validate form inputs
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                body: JSON.stringify(form),
            });

            // Parse the response data
            const data = await res.json();

            // Check if the response is not ok and set the error message
            if (!res.ok) {
                setError(data.error);
                return;
            }

            // Auto login after signup so that to get the session otherwise only user details will be only stored in db 
            await signIn('credentials', {
                email: form.email,
                password: form.password,
                callbackUrl: '/dashboard/links', // redirect after login
            });
        }
        catch (error: any) {
            // Handle any errors that occur during the signup process
            setError(error.message || "Something went wrong");
        }
    };

    return (
        <div className='h-screen w-full flex items-center'>
            <div className='h-full w-full px-6 flex flex-col justify-center text-zinc-800 gap-4 max-w-md mx-auto'>

                {/* Header section with title and link to login */}
                <div className='flex flex-col gap-2 pb-3'>
                    <h1 className='font-bold text-3xl'>Create your account</h1>
                    <p className='text-sm flex gap-1'>
                        Already have an account?
                        <a className='text-blue-500 cursor-pointer hover:text-blue-700 underline' onClick={() => router.push('signin')}>Log in</a>
                    </p>
                </div>

                {/* Button to sign in with Google */}
                <button className='w-full flex items-center gap-2 justify-center p-2 border border-zinc-300 rounded-md text-base mb-4 cursor-pointer hover:bg-zinc-100 hover:border-zinc-500'
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

                {/* Form for email and password signup */}
                <div className="flex justify-center items-center">
                    <div className="w-full">
                        <h3 className="font-semibold text-base mb-1 text-left">Name</h3>
                        <input
                            className="w-full p-2 border border-zinc-300 rounded-md text-base focus:outline-none focus:border-zinc-500  mb-4"
                            name='name'
                            type="text"
                            onChange={handleChange}

                        />
                        <h3 className="font-semibold text-base mb-1 text-left">
                            Email
                        </h3>
                        <input
                            className="w-full p-2 border border-zinc-300 rounded-md text-base focus:outline-none focus:border-zinc-500 mb-4"
                            name='email'
                            type="email"
                            onChange={handleChange}
                        />
                        <h3 className="font-semibold text-base mb-1 text-left">Password</h3>
                        <input
                            className="w-full p-2 border border-zinc-300 rounded-md text-base focus:outline-none focus:border-zinc-500 mb-4"
                            name='password'
                            type="password"
                            onChange={handleChange}
                        />

                        {/* Display error message if signup fails */}
                        {error && <span className='flex items-start gap-1 text-red-500 text-sm transition-colors py-2 pb-3'><CircleAlert size={16} className='mt-1' />{error}</span>}

                        {/* Submit button for the signup form */}
                        <div onClick={handleSubmit}>
                            <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-700">
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
