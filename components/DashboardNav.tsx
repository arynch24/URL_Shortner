import Link from 'next/link';
const DashboardNav = () => {

  return (
    <div className="flex items-center justify-between gap-1 pl-4 pr-8 py-2 border-b border-zinc-300 " >
      <Link href='/' className="flex gap-1 items-center cursor-pointer"  >
        <img src='https://res.cloudinary.com/dr8ubbrmp/image/upload/v1748000628/shoo4vbiqfjyzkmk3hyl.png' className="w-9 h-9" />
        <p className="text-2xl font-semibold text-zinc-800">Cuttly</p>
      </Link >
      <div className="flex items-center gap-2 border p-2 border-zinc-300">
        <div className="w-8 h-8 flex items-center justify-center border border-zinc-500 rounded-[50%] ">
          A
        </div>
        <p>Aryan Chauhan</p>
      </div>
    </div>
  )
}

export default DashboardNav
