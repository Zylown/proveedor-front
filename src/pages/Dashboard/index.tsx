import React, { useState } from 'react';
import { 
  Bell,
  Search,
  Users,
  Menu
} from 'lucide-react';
import { useLocation, Outlet } from 'react-router-dom';
import Sidebar from '../../layouts/Sidebar';
import DashboardContent from '../../layouts/DashboardLayout';

  const PromartDashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const location = useLocation();

  const handleSidebarToggle = (open: boolean) => {
    setSidebarOpen(open);
  };

  const getPageTitle = (): string => {
    const titles: Record<string, string> = {
      '/': 'Panel de Control',
      '/dashboard': 'Panel de Control',
      '/orders': 'Órdenes de Compra',
      '/suppliers': 'Módulo de Proveedores',
      '/logistics': 'Logística y Entregas',
      '/billing': 'Facturación y Pagos',
      '/evaluation': 'Evaluación de Desempeño',
      '/settings': 'Configuración del Sistema'
    };
    return titles[location.pathname] || 'Panel de Control';
  };

  const getPageSubtitle = (): string => {
    const subtitles: Record<string, string> = {
      '/': 'Gestión integral de proveedores y cadena de suministro',
      '/dashboard': 'Gestión integral de proveedores y cadena de suministro',
      '/orders': 'Gestiona las órdenes de compra y seguimiento',
      '/suppliers': 'Administra y gestiona la base de datos de proveedores',
      '/logistics': 'Monitorea entregas y logística de productos',
      '/billing': 'Control de facturación y estados de pago',
      '/evaluation': 'Evalúa el rendimiento y calidad de proveedores',
      '/settings': 'Configuración general del sistema'
    };
    return subtitles[location.pathname] || 'Gestión integral de proveedores';
  };

  // Determinar si estamos en el dashboard principal
  const isDashboardHome = location.pathname === '/' || location.pathname === '/dashboard';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar Component */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        onSidebarToggle={handleSidebarToggle}
      />

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{getPageTitle()}</h1>
                <p className="text-gray-600 mt-1">{getPageSubtitle()}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative hidden md:block">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar proveedores..."
                  className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                />
              </div>
              <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-6">
          {isDashboardHome ? (
            // Mostrar DashboardContent en la página principal
            <DashboardContent />
          ) : (
            // Mostrar páginas hijas (como Orders) via Outlet
            <Outlet />
          )}
        </main>
      </div>
    </div>
  );
};

export default PromartDashboard;