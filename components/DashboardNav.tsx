import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { NEXT_AUTH_CONFIG } from '@/lib/auth';
import Image from 'next/image';
import Profile from './Profile';

const DashboardNav = async () => {

  // Fetch the session to check if the user is authenticated
  const session = await getServerSession(NEXT_AUTH_CONFIG);

  if (!session) {
    return null; // or redirect to login page
  }

  return (
    <div className="flex items-center justify-between gap-1 px-6 py-2 border-b border-zinc-300">
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

      <Profile />
    </div>
  );
};

export default DashboardNav;
