// import { useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
// import Sidebar from "../../layouts/Sidebar";
// import { FiSidebar } from "react-icons/fi";

export default function Dashboard() {
  // const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <main className="flex h-screen">
      {/* Sidebar fijo */}
      {/* <aside
        className={`
          bg-gray-100 border-r transition-all duration-300
          ${sidebarOpen ? "w-64" : "w-16"}
        `}
      >
        <Sidebar isOpen={sidebarOpen} />
      </aside>

      {/* Contenedor derecho (header + contenido con scroll) */}
      {/* <div className="flex flex-col flex-1">
        {/* Header fijo arriba */}
        {/* <header className="flex items-center border-b border-gristransparente h-14 px-4 ">
          <FiSidebar
            className="text-lg cursor-pointer"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          />
          <h1 className="ml-4 font-semibold">
            Sistema de Gestión de Proveedores
          </h1>
        </header> */}

        {/* Contenido con scroll */}
      {/* </div> */}
        <section className="flex-1 p-6">
          <DashboardLayout />
        </section>
    </main>
  );
}
