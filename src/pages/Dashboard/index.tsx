import DashboardLayout from "../../layouts/DashboardLayout";
import Sidebar from "../../layouts/Sidebar";

export default function Dashboard() {
  return (
    <main className="flex">
      {/* {children} */}
      <Sidebar />
      <DashboardLayout />
    </main>
  );
}
