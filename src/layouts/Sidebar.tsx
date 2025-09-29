import  {useNavigate, useLocation} from 'react-router-dom';
import { 
  Home, 
  Building2, 
  ShoppingCart, 
  Truck, 
  Receipt, 
  BarChart3,
  Settings,
  X
} from 'lucide-react';

interface SidebarProps {
  sidebarOpen: boolean;
  onSidebarToggle: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  sidebarOpen,
  onSidebarToggle
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const sidebarItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard Principal', path: '/dashboard' },
    { id: 'proveedores', icon: Building2, label: 'Módulo de Proveedores', path: '/suppliers' },
    { id: 'ordenes', icon: ShoppingCart, label: 'Órdenes de Compra', path: '/orders' },
    { id: 'logistica', icon: Truck, label: 'Logística y Entregas', path: '/logistics' },
    { id: 'facturacion', icon: Receipt, label: 'Facturación y Pagos', path: '/billing' },
    { id: 'evaluacion', icon: BarChart3, label: 'Evaluación de Desempeño', path: '/evaluation' },
    { id: 'configuracion', icon: Settings, label: 'Configuración', path: '/settings' },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    onSidebarToggle(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path || 
          (path === '/dashboard' && location.pathname === '/');
  };
  return (
    <>
      {/* Overlay para móvil */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => onSidebarToggle(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-64 bg-white shadow-lg border-r border-gray-200 z-50 transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        
        {/* Logo y Header del Sidebar */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div 
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => handleNavigation('/dashboard')}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Promart</h1>
              <p className="text-xs text-gray-500">Gestión de Proveedores</p>
            </div>
          </div>
          <button
            onClick={() => onSidebarToggle(false)}
            className="lg:hidden p-1 rounded-md text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>


        {/* Navigation */}
        <nav className="p-4">
          <div className="mb-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Módulos Principales
            </p>
            <ul className="space-y-1">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => handleNavigation(item.path)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors text-left ${
                        active
                          ? 'bg-orange-50 text-orange-600 border border-orange-200'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;