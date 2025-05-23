import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { NEXT_AUTH_CONFIG } from '@/lib/auth';
import Image from 'next/image';

const DashboardNav = async () => {
  const session = await getServerSession(NEXT_AUTH_CONFIG);

  return (
    <div className="flex items-center justify-between gap-1 pl-4 pr-8 py-2 border-b border-zinc-300">
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
      
      <div className="flex items-center gap-2 border p-2 border-zinc-300">
        <div className="w-8 h-8 flex items-center justify-center border border-zinc-500 rounded-full bg-zinc-100 text-zinc-700">
          {session?.user?.image ? (
            <Image
              src={session.user.image}
              alt="user"
              width={32}
              height={32}
              className="rounded-full"
            />
          ) : (
            session?.user?.name?.[0] || '?'
          )}
        </div>
        <p>{session?.user?.name}</p>
      </div>
    </div>
  );
};

export default DashboardNav;
