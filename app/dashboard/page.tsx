'use client'
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const DashboardPage = () => {
    const router = useRouter();

    useEffect(() => {
        router.push('/dashboard/links');
    }
        , [router]);

    return (
        <>
        </>
    )
}

export default DashboardPage;
