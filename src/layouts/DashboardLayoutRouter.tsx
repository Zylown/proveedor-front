import { useState } from "react";
import Sidebar from "./Sidebar";
import { FiSidebar } from "react-icons/fi";
import { Outlet } from "react-router-dom"; // Outlet sirve para renderizar las rutas hijas (dashboard, proveedores, etc)

// Layout que envuelve las páginas que tienen sidebar (Dashboard, Proveedores, etc) para que el sidebar y header sean comunes en todas las páginas
export default function DashboardLayoutRouter() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <main className="flex h-screen">
      {/* Sidebar fijo */}
      <aside
        className={`bg-gray-100 border-r transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-16"
        }`}
      >
        <Sidebar isOpen={sidebarOpen} />
      </aside>

      {/* Contenedor derecho */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <header className="flex items-center border-b border-gristransparente h-14 px-4">
          <FiSidebar
            className="text-lg cursor-pointer"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          />
          <h1 className="ml-4 font-semibold">
            Sistema de Gestión de Proveedores
          </h1>
        </header>

        {/* Contenido */}
        <section className="flex-1 overflow-y-auto p-6">
          <Outlet /> {/* Aquí se renderizan Dashboard, Proveedores, etc. */}
        </section>
      </div>
    </main>
  );
}
