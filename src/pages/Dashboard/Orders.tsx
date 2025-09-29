import React, { useState } from 'react';
import {
Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  Clock,
  XCircle,
  Calendar,
  DollarSign,
  Package,
  Building2,
  ChevronDown,
  MoreHorizontal,
  FileText,
  Truck
} from 'lucide-react';


// Tipos de datos
interface PurchaseOrder {
  id: string;
  orderNumber: string;
  supplier: {
    name: string;
    id: string;
  };
  date: string;
  deliveryDate: string;
  status: 'pendiente' | 'aprobada' | 'en_proceso' | 'entregada' | 'cancelada';
  total: number;
  items: number;
  priority: 'alta' | 'media' | 'baja';
  description: string;
}

const OrdenesCompra: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('todas');
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState<boolean>(false);

  // Datos de ejemplo
  const orders: PurchaseOrder[] = [
    {
      id: '1',
      orderNumber: 'OC-2024-001',
      supplier: { name: 'Ferreterías del Norte SAC', id: 'SUP001' },
      date: '2024-03-15',
      deliveryDate: '2024-03-25',
      status: 'aprobada',
      total: 15750.00,
      items: 12,
      priority: 'alta',
      description: 'Materiales de construcción - Proyecto Alameda'
    },
    {
      id: '2',
      orderNumber: 'OC-2024-002',
      supplier: { name: 'Materiales Premium Ltda', id: 'SUP002' },
      date: '2024-03-14',
      deliveryDate: '2024-03-22',
      status: 'en_proceso',
      total: 8950.50,
      items: 8,
      priority: 'media',
      description: 'Herramientas y accesorios para ferretería'
    },
    {
      id: '3',
      orderNumber: 'OC-2024-003',
      supplier: { name: 'Construcciones Modernas SRL', id: 'SUP003' },
      date: '2024-03-13',
      deliveryDate: '2024-03-20',
      status: 'entregada',
      total: 22300.75,
      items: 15,
      priority: 'alta',
      description: 'Cemento y agregados - Stock tienda principal'
    },
    {
      id: '4',
      orderNumber: 'OC-2024-004',
      supplier: { name: 'Suministros Industriales Corp', id: 'SUP004' },
      date: '2024-03-12',
      deliveryDate: '2024-03-28',
      status: 'pendiente',
      total: 5680.25,
      items: 6,
      priority: 'baja',
      description: 'Equipos de seguridad industrial'
    },
    {
      id: '5',
      orderNumber: 'OC-2024-005',
      supplier: { name: 'Distribuidora El Martillo', id: 'SUP005' },
      date: '2024-03-11',
      deliveryDate: '2024-03-18',
      status: 'cancelada',
      total: 3200.00,
      items: 4,
      priority: 'baja',
      description: 'Pinturas y solventes - Cancelado por proveedor'
    }
  ];

  const stats = [
    {
      title: 'Total Órdenes',
      value: '127',
      change: '+8 este mes',
      icon: FileText,
      color: 'bg-blue-500'
    },
    {
      title: 'En Proceso',
      value: '45',
      change: '12 por entregar',
      icon: Clock,
      color: 'bg-yellow-500'
    },
    {
      title: 'Entregadas',
      value: '78',
      change: '+15 esta semana',
      icon: CheckCircle,
      color: 'bg-green-500'
    },
    {
      title: 'Valor Total',
      value: '$185,240',
      change: '+12% vs mes anterior',
      icon: DollarSign,
      color: 'bg-orange-500'
    }
  ];

  // Funciones auxiliares
  const getStatusColor = (status: PurchaseOrder['status']) => {
    switch (status) {
      case 'pendiente': return 'bg-yellow-100 text-yellow-800';
      case 'aprobada': return 'bg-blue-100 text-blue-800';
      case 'en_proceso': return 'bg-purple-100 text-purple-800';
      case 'entregada': return 'bg-green-100 text-green-800';
      case 'cancelada': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: PurchaseOrder['status']) => {
    switch (status) {
      case 'pendiente': return <Clock className="w-4 h-4" />;
      case 'aprobada': return <CheckCircle className="w-4 h-4" />;
      case 'en_proceso': return <Package className="w-4 h-4" />;
      case 'entregada': return <Truck className="w-4 h-4" />;
      case 'cancelada': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusLabel = (status: PurchaseOrder['status']) => {
    const labels = {
      'pendiente': 'Pendiente',
      'aprobada': 'Aprobada',
      'en_proceso': 'En Proceso',
      'entregada': 'Entregada',
      'cancelada': 'Cancelada'
    };
    return labels[status];
  };

  const getPriorityColor = (priority: PurchaseOrder['priority']) => {
    switch (priority) {
      case 'alta': return 'bg-red-50 text-red-700 border-red-200';
      case 'media': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'baja': return 'bg-green-50 text-green-700 border-green-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-PE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'todas' || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleSelectOrder = (orderId: string) => {
    setSelectedOrders(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  const handleSelectAll = () => {
    if (selectedOrders.length === filteredOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(filteredOrders.map(order => order.id));
    }
  };

  return (
      <div>
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Órdenes de Compra</h1>
            <p className="text-gray-600 mt-1">Gestiona y realiza seguimiento a todas las órdenes de compra</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4" />
              <span>Exportar</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
              <Plus className="w-4 h-4" />
              <span>Nueva Orden</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.change}</p>
              </div>
            </div>
          );
        })}
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
                placeholder="Buscar por número, proveedor o descripción..."
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
                <option value="todas">Todos los estados</option>
                <option value="pendiente">Pendiente</option>
                <option value="aprobada">Aprobada</option>
                <option value="en_proceso">En Proceso</option>
                <option value="entregada">Entregada</option>
                <option value="cancelada">Cancelada</option>
              </select>
              <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>

            {/* Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 bg-gray-50 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span>Filtros</span>
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Prioridad</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none">
                    <option value="">Todas</option>
                    <option value="alta">Alta</option>
                    <option value="media">Media</option>
                    <option value="baja">Baja</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bulk Actions */}
        {selectedOrders.length > 0 && (
          <div className="px-6 py-3 bg-orange-50 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-orange-700">
                  {selectedOrders.length} órdenes seleccionadas
                </span>
                <div className="flex gap-2">
                  <button className="text-sm text-orange-600 hover:text-orange-700 font-medium">
                    Aprobar seleccionadas
                  </button>
                  <button className="text-sm text-orange-600 hover:text-orange-700 font-medium">
                    Exportar seleccionadas
                  </button>
                </div>
              </div>
              <button
                onClick={() => setSelectedOrders([])}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Cancelar selección
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left p-4">
                  <input
                    type="checkbox"
                    checked={selectedOrders.length === filteredOrders.length && filteredOrders.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                  />
                </th>
                <th className="text-left p-4 font-semibold text-gray-900">Número de Orden</th>
                <th className="text-left p-4 font-semibold text-gray-900">Proveedor</th>
                <th className="text-left p-4 font-semibold text-gray-900">Estado</th>
                <th className="text-left p-4 font-semibold text-gray-900">Prioridad</th>
                <th className="text-left p-4 font-semibold text-gray-900">Fecha</th>
                <th className="text-left p-4 font-semibold text-gray-900">Entrega</th>
                <th className="text-left p-4 font-semibold text-gray-900">Total</th>
                <th className="text-left p-4 font-semibold text-gray-900">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedOrders.includes(order.id)}
                      onChange={() => handleSelectOrder(order.id)}
                      className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                    />
                  </td>
                  <td className="p-4">
                    <div>
                      <div className="font-semibold text-gray-900">{order.orderNumber}</div>
                      <div className="text-sm text-gray-500">{order.items} ítems</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <Building2 className="w-4 h-4 text-orange-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{order.supplier.name}</div>
                        <div className="text-sm text-gray-500">ID: {order.supplier.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      <span>{getStatusLabel(order.status)}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium border ${getPriorityColor(order.priority)}`}>
                      {order.priority.charAt(0).toUpperCase() + order.priority.slice(1)}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(order.date)}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-gray-900">{formatDate(order.deliveryDate)}</div>
                  </td>
                  <td className="p-4">
                    <div className="font-semibold text-gray-900">{formatCurrency(order.total)}</div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1 text-gray-400 hover:text-blue-600 rounded transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-green-600 rounded transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-red-600 rounded transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-gray-600 rounded transition-colors">
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
        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron órdenes</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || selectedStatus !== 'todas' 
                ? 'Intenta ajustar los filtros de búsqueda'
                : 'Comienza creando tu primera orden de compra'
              }
            </p>
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
              <Plus className="w-4 h-4" />
              <span>Nueva Orden</span>
            </button>
          </div>
        )}

        {/* Pagination */}
        {filteredOrders.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Mostrando {filteredOrders.length} de {orders.length} órdenes
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

export default OrdenesCompra;