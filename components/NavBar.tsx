import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { NEXT_AUTH_CONFIG } from '@/lib/auth';
import Image from 'next/image';

const  MenuBar = () => {
    return (
       <div>
        
       </div>
    );
}

const DashboardNav = async () => {
    // Fetch the session to check if the user is authenticated
    const session = await getServerSession(NEXT_AUTH_CONFIG);

    return (
        <div className="flex items-center justify-between gap-1 px-6 md:px-24 pr-30 py-4 border-b border-zinc-300">
            <Link href='/' className="flex gap-1 items-center cursor-pointer">
                <Image
                    src='https://res.cloudinary.com/dr8ubbrmp/image/upload/v1748000628/shoo4vbiqfjyzkmk3hyl.png'
                    className="w-9 h-9"
                    alt="logo"
                    width={36}
                    height={36}
                />
                <p className="text-2xl font-semibold text-zinc-800">Cuttly</p>
            </Link>

            {/* Profile component to display user information or avatar */}
            {
                session ?
                    null
                    :
                    <div className="md:flex items-center gap-6 hidden ">
                        <Link href='/signin'
                            className="px-4 py-2 border border-zinc-500 rounded-md hover:bg-zinc-100 transition duration-200">
                            LogIn
                        </Link>
                        <Link href='/signup'
                            className=" bg-blue-600 shadow-lg border border-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200">
                            SignUp
                        </Link>
                    </div>
            }
        </div>
    );
};

export default DashboardNav;
