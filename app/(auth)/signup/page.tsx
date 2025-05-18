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
                callbackUrl: '/', // redirect after login
            });
        }
        catch (error: any) {
            setError(error.message || "Something went wrong");
        }

    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-sm mx-auto p-5">
            <input name="name" placeholder="Name" onChange={handleChange} className="border p-2" />
            <input name="email" placeholder="Email" onChange={handleChange} className="border p-2" />
            <input name="password" placeholder="Password" type="password" onChange={handleChange} className="border p-2" />
            {error && <p className="text-red-500">{error}</p>}
            <button type="submit" className="bg-black text-white py-2">Sign Up</button>
        </form>
    );
};

export default SignupPage;
