import DashboardNav from "@/components/DashboardNav";
import SideBar from "@/components/SideBar";

const DashboardLayout = ({ children }: Readonly<{ children: React.ReactNode; }>) => {
    return (
        <div className="h-screen">
            <DashboardNav />
            <div className="h-[calc(100vh-4.1rem)] flex w-full">
                <div>
                    <SideBar />
                </div>
                <div className="w-full bg-zinc-50">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default DashboardLayout;
