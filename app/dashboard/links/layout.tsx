import SideBar from "@/components/SideBar";

const DashboardLayout = ({ children }: Readonly<{ children: React.ReactNode; }>) => {
    return (
        <div className="">
            {children}
        </div>
    )
}

export default DashboardLayout;
