import { useNavigate } from 'react-router-dom';
import { 
  Building2, 
  ShoppingCart, 
  Truck, 
  Receipt,
  TrendingUp,
  Clock,
  AlertTriangle,
  CheckCircle,
  Plus,
  BarChart3
} from 'lucide-react';

import type { LucideIcon } from 'lucide-react';

interface StatsCard {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  color: string;
}

interface Activity {
  type: 'success' | 'warning' | 'info' | 'alert';
  title: string;
  supplier: string;
  time: string;
  icon: LucideIcon;
}

interface Supplier {
  name: string;
  orders: number;
  rating: string;
  badge: string;
  color: string;
}

interface DashboardContentProps {
  [key: string]: unknown;
}

const DashboardContent: React.FC<DashboardContentProps> = () => { // ← QUITAMOS { onSectionChange }
  const navigate = useNavigate(); // ← NUEVO: Hook para navegación

  // Función para manejar la navegación desde las quick actions
  const handleQuickAction = (sectionId: string) => {
    const routeMap: Record<string, string> = {
      'Proveedores': '/suppliers',
      'Ordenes': '/orders',
      'Logistica': '/logistics',
      'Facturacion': '/billing',
      'Evaluacion': '/evaluation',
      'Configuracion': '/settings'
    };
    
    if (routeMap[sectionId]) {
      navigate(routeMap[sectionId]);
    }
  };

  // Datos del Dashboard (TODO ESTO SE MANTIENE IGUAL)
  const statsCards: StatsCard[] = [
    {
      title: 'Proveedores Activos',
      value: '342',
      change: '+15% vs mes anterior',
      icon: Building2,
      color: 'bg-orange-500'
    },
    {
      title: 'Órdenes en Proceso',
      value: '127',
      change: '+8 nuevas hoy',
      icon: ShoppingCart,
      color: 'bg-blue-500'
    },
    {
      title: 'Entregas Programadas',
      value: '45',
      change: '12 para mañana',
      icon: Truck,
      color: 'bg-green-500'
    },
    {
      title: 'Facturas Pendientes',
      value: '$82,450',
      change: '23 documentos',
      icon: Receipt,
      color: 'bg-red-500'
    }
  ];

  const recentActivity: Activity[] = [
    {
      type: 'success',
      title: 'Orden #PRO-2024-0892 completada',
      supplier: 'Ferreterías del Norte SAC',
      time: 'Hace 2 horas',
      icon: CheckCircle
    },
    {
      type: 'warning',
      title: 'Entrega retrasada - Orden #PRO-2024-0885',
      supplier: 'Materiales Premium Ltda',
      time: 'Hace 4 horas',
      icon: Clock
    },
    {
      type: 'info',
      title: 'Nuevo proveedor registrado',
      supplier: 'Construcciones Modernas SRL',
      time: 'Hace 1 día',
      icon: Plus
    },
    {
      type: 'alert',
      title: 'Evaluación de calidad pendiente',
      supplier: 'Suministros Industriales Corp',
      time: 'Hace 2 días',
      icon: AlertTriangle
    }
  ];

  const topSuppliers: Supplier[] = [
    {
      name: 'Ferreterías del Norte SAC',
      orders: 28,
      rating: '98%',
      badge: 'Excelencia',
      color: 'bg-green-100 text-green-800'
    },
    {
      name: 'Materiales Premium Ltda',
      orders: 22,
      rating: '95%',
      badge: 'Premium',
      color: 'bg-blue-100 text-blue-800'
    },
    {
      name: 'Construcciones Modernas SRL',
      orders: 19,
      rating: '92%',
      badge: 'Confiable',
      color: 'bg-orange-100 text-orange-800'
    }
  ];

  const getStatusColor = (type: Activity['type']) => {
    switch (type) {
      case 'success': return 'text-green-500 bg-green-50';
      case 'warning': return 'text-yellow-500 bg-yellow-50';
      case 'info': return 'text-blue-500 bg-blue-50';
      case 'alert': return 'text-red-500 bg-red-50';
      default: return 'text-gray-500 bg-gray-50';
    }
  };

  return (
    <>
      {/* Stats Cards (TODO IGUAL) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${card.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">{card.title}</p>
                <p className="text-3xl font-bold text-gray-900 mb-1">{card.value}</p>
                <p className="text-xs text-gray-500">{card.change}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity (TODO IGUAL) */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Actividad Reciente</h3>
              <p className="text-sm text-gray-500">Últimas acciones en el sistema</p>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivity.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <div key={index} className="flex items-start gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStatusColor(activity.type)}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <p className="text-sm text-gray-600">{activity.supplier}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Top Suppliers (TODO IGUAL) */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Proveedores Destacados</h3>
              <p className="text-sm text-gray-500">Mejor desempeño del mes</p>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {topSuppliers.map((supplier, index) => (
                <div key={index} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{supplier.name}</p>
                      <p className="text-sm text-gray-600">{supplier.orders} órdenes completadas</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${supplier.color}`}>
                      {supplier.badge}
                    </span>
                    <p className="text-sm font-semibold text-gray-900 mt-1">{supplier.rating}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Acciones Rápidas</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button 
              onClick={() => handleQuickAction('Proveedores')}
              className="flex flex-col items-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-colors group"
            >
              <Plus className="w-6 h-6 text-gray-400 group-hover:text-orange-500" />
              <span className="text-sm font-medium text-gray-600 group-hover:text-orange-600">Registrar Proveedor</span>
            </button>
            <button 
                onClick={() => handleQuickAction('Ordenes')} // ← Cambié la función
                className="flex flex-col items-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-colors group"
>
              <ShoppingCart className="w-6 h-6 text-gray-400 group-hover:text-orange-500" />
              <span className="text-sm font-medium text-gray-600 group-hover:text-orange-600">Nueva Orden</span>
            </button>
            <button 
              onClick={() => handleQuickAction('Evaluacion')}
              className="flex flex-col items-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-colors group"
            >
              <BarChart3 className="w-6 h-6 text-gray-400 group-hover:text-orange-500" />
              <span className="text-sm font-medium text-gray-600 group-hover:text-orange-600">Generar Reporte</span>
            </button>
            <button 
              onClick={() => handleQuickAction('Facturacion')}
              className="flex flex-col items-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-colors group"
            >
              <Receipt className="w-6 h-6 text-gray-400 group-hover:text-orange-500" />
              <span className="text-sm font-medium text-gray-600 group-hover:text-orange-600">Revisar Facturas</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardContent;