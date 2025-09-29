// pages/Dashboard/Logistics.tsx
import React, { useState } from 'react';
import {
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  CheckCircle,
  Clock,
  XCircle,
  MapPin,
  Truck,
  ChevronDown,
  MoreHorizontal,
  Package,
  Users,
  TrendingUp,
  AlertTriangle,
  Navigation,
  Route,
  Thermometer,
  RefreshCw,
} from 'lucide-react';

// Tipos de datos
interface Delivery {
  id: string;
  trackingNumber: string;
  orderNumber: string;
  supplier: {
    name: string;
    id: string;
  };
  destination: string;
  driver: string;
  vehicle: string;
  startDate: string;
  estimatedDelivery: string;
  actualDelivery?: string;
  status: 'programado' | 'en_ruta' | 'entregado' | 'retrasado' | 'cancelado';
  currentLocation: string;
  distanceRemaining: number;
  progress: number;
  temperature?: number;
  humidity?: number;
  alerts: string[];
}

interface LogisticsStats {
  title: string;
  value: string;
  change: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
  trend: 'up' | 'down' | 'neutral';
}

type DeliveryStatus = 'programado' | 'en_ruta' | 'entregado' | 'retrasado' | 'cancelado';

const Logistics: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('todos');
  const [selectedDeliveries, setSelectedDeliveries] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'entregas' | 'flota' | 'rutas' | 'alertas'>('entregas');

  // Datos de ejemplo
  const deliveries: Delivery[] = [
    {
      id: '1',
      trackingNumber: 'TRK-2024-001',
      orderNumber: 'OC-2024-001',
      supplier: { name: 'Ferreterías del Norte SAC', id: 'SUP001' },
      destination: 'Almacén Principal - Lima',
      driver: 'Juan Pérez',
      vehicle: 'CAM-001 (Volvo FH)',
      startDate: '2024-04-15T08:00:00',
      estimatedDelivery: '2024-04-15T18:00:00',
      actualDelivery: '2024-04-15T17:45:00',
      status: 'entregado',
      currentLocation: 'Almacén Principal',
      distanceRemaining: 0,
      progress: 100,
      temperature: 22,
      humidity: 45,
      alerts: []
    },
    {
      id: '2',
      trackingNumber: 'TRK-2024-002',
      orderNumber: 'OC-2024-002',
      supplier: { name: 'Materiales Premium Ltda', id: 'SUP002' },
      destination: 'Tienda Miraflores - Lima',
      driver: 'María García',
      vehicle: 'CAM-002 (Mercedes Actros)',
      startDate: '2024-04-16T07:30:00',
      estimatedDelivery: '2024-04-16T14:00:00',
      status: 'en_ruta',
      currentLocation: 'Km 35 Panamericana Norte',
      distanceRemaining: 45,
      progress: 65,
      temperature: 18,
      humidity: 50,
      alerts: ['Tráfico moderado']
    },
    {
      id: '3',
      trackingNumber: 'TRK-2024-003',
      orderNumber: 'OC-2024-003',
      supplier: { name: 'Construcciones Modernas SRL', id: 'SUP003' },
      destination: 'Proyecto Alameda - Arequipa',
      driver: 'Carlos Rodríguez',
      vehicle: 'CAM-003 (Scania R450)',
      startDate: '2024-04-14T10:00:00',
      estimatedDelivery: '2024-04-17T16:00:00',
      status: 'retrasado',
      currentLocation: 'Km 780 Panamericana Sur',
      distanceRemaining: 320,
      progress: 35,
      temperature: 25,
      humidity: 40,
      alerts: ['Retraso por clima', 'Revisión técnica requerida']
    },
    {
      id: '4',
      trackingNumber: 'TRK-2024-004',
      orderNumber: 'OC-2024-004',
      supplier: { name: 'Suministros Industriales Corp', id: 'SUP004' },
      destination: 'Planta Trujillo - La Libertad',
      driver: 'Ana Martínez',
      vehicle: 'CAM-004 (Volvo FM)',
      startDate: '2024-04-17T09:00:00',
      estimatedDelivery: '2024-04-17T17:30:00',
      status: 'programado',
      currentLocation: 'Almacén Central',
      distanceRemaining: 560,
      progress: 0,
      alerts: []
    },
    {
      id: '5',
      trackingNumber: 'TRK-2024-005',
      orderNumber: 'OC-2024-005',
      supplier: { name: 'Distribuidora El Martillo', id: 'SUP005' },
      destination: 'Tienda Centro - Chiclayo',
      driver: 'Roberto Silva',
      vehicle: 'CAM-005 (Mercedes Atego)',
      startDate: '2024-04-13T11:00:00',
      estimatedDelivery: '2024-04-13T19:00:00',
      status: 'cancelado',
      currentLocation: 'Taller Mantenimiento',
      distanceRemaining: 0,
      progress: 0,
      alerts: ['Cancelado por proveedor']
    }
  ];

  const logisticsStats: LogisticsStats[] = [
    {
      title: 'Entregas Hoy',
      value: '24',
      change: '18 completadas',
      icon: Package,
      color: 'bg-green-500',
      trend: 'up'
    },
    {
      title: 'En Ruta',
      value: '12',
      change: '3 con retraso',
      icon: Truck,
      color: 'bg-blue-500',
      trend: 'neutral'
    },
    {
      title: 'Flota Activa',
      value: '8/10',
      change: '2 en mantenimiento',
      icon: Users,
      color: 'bg-orange-500',
      trend: 'down'
    },
    {
      title: 'Tiempo Promedio',
      value: '4.2h',
      change: '-15% vs semana anterior',
      icon: Clock,
      color: 'bg-purple-500',
      trend: 'up'
    }
  ];

  // Funciones auxiliares
  const getStatusColor = (status: DeliveryStatus) => {
    switch (status) {
      case 'programado': return 'bg-blue-100 text-blue-800';
      case 'en_ruta': return 'bg-yellow-100 text-yellow-800';
      case 'entregado': return 'bg-green-100 text-green-800';
      case 'retrasado': return 'bg-red-100 text-red-800';
      case 'cancelado': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: DeliveryStatus) => {
    switch (status) {
      case 'programado': return <Clock className="w-4 h-4" />;
      case 'en_ruta': return <Truck className="w-4 h-4" />;
      case 'entregado': return <CheckCircle className="w-4 h-4" />;
      case 'retrasado': return <AlertTriangle className="w-4 h-4" />;
      case 'cancelado': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusLabel = (status: DeliveryStatus) => {
    const labels: Record<DeliveryStatus, string> = {
      'programado': 'Programado',
      'en_ruta': 'En Ruta',
      'entregado': 'Entregado',
      'retrasado': 'Retrasado',
      'cancelado': 'Cancelado'
    };
    return labels[status];
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('es-PE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 90) return 'bg-green-500';
    if (progress >= 70) return 'bg-blue-500';
    if (progress >= 50) return 'bg-yellow-500';
    if (progress >= 25) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const filteredDeliveries = deliveries.filter(delivery => {
    const matchesSearch = delivery.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         delivery.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         delivery.supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         delivery.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'todos' || delivery.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleSelectDelivery = (deliveryId: string) => {
    setSelectedDeliveries(prev => 
      prev.includes(deliveryId) 
        ? prev.filter(id => id !== deliveryId)
        : [...prev, deliveryId]
    );
  };

  const handleSelectAll = () => {
    if (selectedDeliveries.length === filteredDeliveries.length) {
      setSelectedDeliveries([]);
    } else {
      setSelectedDeliveries(filteredDeliveries.map(delivery => delivery.id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Logística y Entregas</h1>
            <p className="text-gray-600 mt-1">Monitorea entregas y logística de productos en tiempo real</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4" />
              <span>Exportar Reporte</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
              <Plus className="w-4 h-4" />
              <span>Nueva Ruta</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs de Navegación */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('entregas')}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'entregas'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4" />
                Seguimiento de Entregas
              </div>
            </button>
            <button
              onClick={() => setActiveTab('flota')}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'flota'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4" />
                Gestión de Flota
              </div>
            </button>
            <button
              onClick={() => setActiveTab('rutas')}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'rutas'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <Route className="w-4 h-4" />
                Optimización de Rutas
              </div>
            </button>
            <button
              onClick={() => setActiveTab('alertas')}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'alertas'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Alertas y Monitoreo
              </div>
            </button>
          </nav>
        </div>
      </div>

      {/* Stats Cards con enfoque logístico */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {logisticsStats.map((stat, index) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingUp;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <TrendIcon className={`w-4 h-4 ${
                  stat.trend === 'up' ? 'text-green-500' : 
                  stat.trend === 'down' ? 'text-red-500 rotate-180' : 'text-gray-500'
                }`} />
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.change}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mapa de Calor de Entregas (Placeholder) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Mapa de Entregas en Tiempo Real</h3>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <RefreshCw className="w-4 h-4" />
            Actualizado hace 2 minutos
          </div>
        </div>
        <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">Mapa de seguimiento en tiempo real</p>
            <p className="text-sm text-gray-400">12 vehículos activos • 8 entregas en progreso</p>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por número de tracking, orden, proveedor o destino..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <select
                className="appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white min-w-[150px]"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="todos">Todos los estados</option>
                <option value="programado">Programado</option>
                <option value="en_ruta">En Ruta</option>
                <option value="entregado">Entregado</option>
                <option value="retrasado">Retrasado</option>
                <option value="cancelado">Cancelado</option>
              </select>
              <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>

            {/* Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 bg-gray-50 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span>Filtros Avanzados</span>
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fecha desde</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fecha hasta</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Conductor</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none">
                    <option value="">Todos los conductores</option>
                    <option value="juan">Juan Pérez</option>
                    <option value="maria">María García</option>
                    <option value="carlos">Carlos Rodríguez</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vehículo</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none">
                    <option value="">Todos los vehículos</option>
                    <option value="cam001">CAM-001</option>
                    <option value="cam002">CAM-002</option>
                    <option value="cam003">CAM-003</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bulk Actions */}
        {selectedDeliveries.length > 0 && (
          <div className="px-6 py-3 bg-orange-50 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-orange-700">
                  {selectedDeliveries.length} entregas seleccionadas
                </span>
                <div className="flex gap-2">
                  <button className="text-sm text-orange-600 hover:text-orange-700 font-medium">
                    Actualizar estado
                  </button>
                  <button className="text-sm text-orange-600 hover:text-orange-700 font-medium">
                    Enviar notificación
                  </button>
                  <button className="text-sm text-orange-600 hover:text-orange-700 font-medium">
                    Reasignar ruta
                  </button>
                </div>
              </div>
              <button
                onClick={() => setSelectedDeliveries([])}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Cancelar selección
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Deliveries Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left p-4">
                  <input
                    type="checkbox"
                    checked={selectedDeliveries.length === filteredDeliveries.length && filteredDeliveries.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                  />
                </th>
                <th className="text-left p-4 font-semibold text-gray-900">Tracking</th>
                <th className="text-left p-4 font-semibold text-gray-900">Proveedor & Destino</th>
                <th className="text-left p-4 font-semibold text-gray-900">Conductor & Vehículo</th>
                <th className="text-left p-4 font-semibold text-gray-900">Progreso</th>
                <th className="text-left p-4 font-semibold text-gray-900">Estado</th>
                <th className="text-left p-4 font-semibold text-gray-900">Tiempo</th>
                <th className="text-left p-4 font-semibold text-gray-900">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredDeliveries.map((delivery) => (
                <tr key={delivery.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedDeliveries.includes(delivery.id)}
                      onChange={() => handleSelectDelivery(delivery.id)}
                      className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                    />
                  </td>
                  <td className="p-4">
                    <div>
                      <div className="font-semibold text-gray-900">{delivery.trackingNumber}</div>
                      <div className="text-sm text-gray-500">{delivery.orderNumber}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div>
                      <div className="font-medium text-gray-900">{delivery.supplier.name}</div>
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {delivery.destination}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        {delivery.currentLocation}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div>
                      <div className="font-medium text-gray-900">{delivery.driver}</div>
                      <div className="text-sm text-gray-500">{delivery.vehicle}</div>
                      {delivery.temperature && (
                        <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                          <Thermometer className="w-3 h-3" />
                          {delivery.temperature}°C • {delivery.humidity}%H
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Progreso</span>
                        <span className="font-medium">{delivery.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getProgressColor(delivery.progress)}`}
                          style={{ width: `${delivery.progress}%` }}
                        ></div>
                      </div>
                      {delivery.distanceRemaining > 0 && (
                        <div className="text-xs text-gray-500">
                          {delivery.distanceRemaining} km restantes
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-2">
                      <div className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(delivery.status)}`}>
                        {getStatusIcon(delivery.status)}
                        <span>{getStatusLabel(delivery.status)}</span>
                      </div>
                      {delivery.alerts.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {delivery.alerts.map((alert, index) => (
                            <span key={index} className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-red-50 text-red-700">
                              <AlertTriangle className="w-3 h-3" />
                              {alert}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-1 text-sm">
                      <div className="text-gray-600">
                        <span className="font-medium">Inicio:</span> {formatDateTime(delivery.startDate)}
                      </div>
                      <div className="text-gray-600">
                        <span className="font-medium">Estimado:</span> {formatDateTime(delivery.estimatedDelivery)}
                      </div>
                      {delivery.actualDelivery && (
                        <div className="text-green-600">
                          <span className="font-medium">Real:</span> {formatDateTime(delivery.actualDelivery)}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1 text-gray-400 hover:text-blue-600 rounded transition-colors" title="Rastrear en tiempo real">
                        <Navigation className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-green-600 rounded transition-colors" title="Actualizar estado">
                        <RefreshCw className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-purple-600 rounded transition-colors" title="Ver detalles">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-gray-600 rounded transition-colors" title="Más opciones">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredDeliveries.length === 0 && (
          <div className="text-center py-12">
            <Truck className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron entregas</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || selectedStatus !== 'todos' 
                ? 'Intenta ajustar los filtros de búsqueda'
                : 'Comienza programando tu primera entrega'
              }
            </p>
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
              <Plus className="w-4 h-4" />
              <span>Programar Entrega</span>
            </button>
          </div>
        )}

        {/* Pagination */}
        {filteredDeliveries.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Mostrando {filteredDeliveries.length} de {deliveries.length} entregas
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-2 text-sm text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                  Anterior
                </button>
                <button className="px-3 py-2 text-sm text-white bg-orange-500 border border-orange-500 rounded-lg">
                  1
                </button>
                <button className="px-3 py-2 text-sm text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                  2
                </button>
                <button className="px-3 py-2 text-sm text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                  Siguiente
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Logistics;