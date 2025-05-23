import DashboardNav from "@/components/DashboardNav";
import SideBar from "@/components/SideBar";

const DashboardLayout = ({ children }: Readonly<{ children: React.ReactNode; }>) => {
    return (
        <div className="">
            <DashboardNav />

            <div className="flex gap-2 h-screen w-full">
                <div className="">
                    <SideBar />
                </div>
                <div className="w-full h-screen">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default DashboardLayout;
