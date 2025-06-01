'use client'
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const DashboardPage = () => {
    const router = useRouter();

    // Redirect to the links page when the dashboard page is accessed
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
