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
  Building2,
  ChevronDown,
  MoreHorizontal,
  FileText,
  Star,
  UserCheck,
  AlertCircle,
  MapPin,
  Phone,
  Mail,
  Users
} from 'lucide-react';

// Tipos de datos
interface Supplier {
  id: string;
  name: string;
  ruc: string;
  contact: {
    name: string;
    email: string;
    phone: string;
  };
  registrationDate: string;
  status: 'activo' | 'pendiente' | 'suspendido' | 'inactivo';
  category: string;
  rating: number;
  ordersCompleted: number;
  totalVolume: number;
  location: string;
  evaluation: 'excelente' | 'bueno' | 'regular' | 'deficiente';
}

const Suppliers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('todos');
  const [selectedSuppliers, setSelectedSuppliers] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState<boolean>(false);

  // Datos de ejemplo
  const suppliers: Supplier[] = [
    {
      id: '1',
      name: 'Ferreterías del Norte SAC',
      ruc: '20123456789',
      contact: {
        name: 'Juan Pérez',
        email: 'juan.perez@ferreteriasdelnorte.com',
        phone: '+51 987 654 321'
      },
      registrationDate: '2023-05-15',
      status: 'activo',
      category: 'Materiales de Construcción',
      rating: 4.8,
      ordersCompleted: 156,
      totalVolume: 1250000,
      location: 'Lima, Perú',
      evaluation: 'excelente'
    },
    {
      id: '2',
      name: 'Materiales Premium Ltda',
      ruc: '20345678901',
      contact: {
        name: 'María García',
        email: 'mgarcia@materialespremium.com',
        phone: '+51 987 123 456'
      },
      registrationDate: '2023-08-22',
      status: 'activo',
      category: 'Herramientas y Equipos',
      rating: 4.5,
      ordersCompleted: 89,
      totalVolume: 780000,
      location: 'Arequipa, Perú',
      evaluation: 'bueno'
    },
    {
      id: '3',
      name: 'Construcciones Modernas SRL',
      ruc: '20456789012',
      contact: {
        name: 'Carlos Rodríguez',
        email: 'c.rodriguez@construccionesmodernas.com',
        phone: '+51 987 789 123'
      },
      registrationDate: '2023-11-10',
      status: 'pendiente',
      category: 'Servicios de Construcción',
      rating: 4.2,
      ordersCompleted: 34,
      totalVolume: 450000,
      location: 'Trujillo, Perú',
      evaluation: 'regular'
    },
    {
      id: '4',
      name: 'Suministros Industriales Corp',
      ruc: '20567890123',
      contact: {
        name: 'Ana Martínez',
        email: 'a.martinez@suministrosindustriales.com',
        phone: '+51 987 456 789'
      },
      registrationDate: '2023-02-28',
      status: 'activo',
      category: 'Equipos Industriales',
      rating: 4.9,
      ordersCompleted: 201,
      totalVolume: 1980000,
      location: 'Lima, Perú',
      evaluation: 'excelente'
    },
    {
      id: '5',
      name: 'Distribuidora El Martillo',
      ruc: '20678901234',
      contact: {
        name: 'Roberto Silva',
        email: 'rsilva@elmartillo.com',
        phone: '+51 987 321 654'
      },
      registrationDate: '2023-09-05',
      status: 'suspendido',
      category: 'Ferretería General',
      rating: 3.2,
      ordersCompleted: 67,
      totalVolume: 320000,
      location: 'Chiclayo, Perú',
      evaluation: 'deficiente'
    },
    {
      id: '6',
      name: 'Tecnologías de Construcción SA',
      ruc: '20789012345',
      contact: {
        name: 'Laura Fernández',
        email: 'l.fernandez@tecnoconstruccion.com',
        phone: '+51 987 654 987'
      },
      registrationDate: '2024-01-18',
      status: 'activo',
      category: 'Tecnología y Equipos',
      rating: 4.7,
      ordersCompleted: 42,
      totalVolume: 580000,
      location: 'Lima, Perú',
      evaluation: 'bueno'
    }
  ];

  const stats = [
    {
      title: 'Total Proveedores',
      value: '342',
      change: '+15 este mes',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Proveedores Activos',
      value: '298',
      change: '94% del total',
      icon: UserCheck,
      color: 'bg-green-500'
    },
    {
      title: 'Evaluación Pendiente',
      value: '23',
      change: '6 por revisar',
      icon: Clock,
      color: 'bg-yellow-500'
    },
    {
      title: 'Volumen Anual',
      value: '$8.2M',
      change: '+12% vs año anterior',
      icon: DollarSign,
      color: 'bg-orange-500'
    }
  ];

  // Funciones auxiliares
  const getStatusColor = (status: Supplier['status']) => {
    switch (status) {
      case 'activo': return 'bg-green-100 text-green-800';
      case 'pendiente': return 'bg-yellow-100 text-yellow-800';
      case 'suspendido': return 'bg-red-100 text-red-800';
      case 'inactivo': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: Supplier['status']) => {
    switch (status) {
      case 'activo': return <CheckCircle className="w-4 h-4" />;
      case 'pendiente': return <Clock className="w-4 h-4" />;
      case 'suspendido': return <XCircle className="w-4 h-4" />;
      case 'inactivo': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusLabel = (status: Supplier['status']) => {
    const labels = {
      'activo': 'Activo',
      'pendiente': 'Pendiente',
      'suspendido': 'Suspendido',
      'inactivo': 'Inactivo'
    };
    return labels[status];
  };

  const getEvaluationColor = (evaluation: Supplier['evaluation']) => {
    switch (evaluation) {
      case 'excelente': return 'bg-green-100 text-green-800';
      case 'bueno': return 'bg-blue-100 text-blue-800';
      case 'regular': return 'bg-yellow-100 text-yellow-800';
      case 'deficiente': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-PE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.ruc.includes(searchTerm) ||
                         supplier.contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'todos' || supplier.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleSelectSupplier = (supplierId: string) => {
    setSelectedSuppliers(prev => 
      prev.includes(supplierId) 
        ? prev.filter(id => id !== supplierId)
        : [...prev, supplierId]
    );
  };

  const handleSelectAll = () => {
    if (selectedSuppliers.length === filteredSuppliers.length) {
      setSelectedSuppliers([]);
    } else {
      setSelectedSuppliers(filteredSuppliers.map(supplier => supplier.id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Módulo de Proveedores</h1>
            <p className="text-gray-600 mt-1">Administra y gestiona la base de datos de proveedores</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4" />
              <span>Exportar</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
              <Plus className="w-4 h-4" />
              <span>Nuevo Proveedor</span>
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
                placeholder="Buscar por nombre, RUC, contacto o categoría..."
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
                <option value="activo">Activo</option>
                <option value="pendiente">Pendiente</option>
                <option value="suspendido">Suspendido</option>
                <option value="inactivo">Inactivo</option>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none">
                    <option value="">Todas las categorías</option>
                    <option value="construccion">Materiales de Construcción</option>
                    <option value="herramientas">Herramientas y Equipos</option>
                    <option value="servicios">Servicios de Construcción</option>
                    <option value="industrial">Equipos Industriales</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Evaluación mínima</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none">
                    <option value="">Cualquier evaluación</option>
                    <option value="4.5">Excelente (4.5+)</option>
                    <option value="4.0">Bueno (4.0+)</option>
                    <option value="3.0">Regular (3.0+)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ubicación</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none">
                    <option value="">Todas las ubicaciones</option>
                    <option value="lima">Lima</option>
                    <option value="arequipa">Arequipa</option>
                    <option value="trujillo">Trujillo</option>
                    <option value="chiclayo">Chiclayo</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bulk Actions */}
        {selectedSuppliers.length > 0 && (
          <div className="px-6 py-3 bg-orange-50 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-orange-700">
                  {selectedSuppliers.length} proveedores seleccionados
                </span>
                <div className="flex gap-2">
                  <button className="text-sm text-orange-600 hover:text-orange-700 font-medium">
                    Activar seleccionados
                  </button>
                  <button className="text-sm text-orange-600 hover:text-orange-700 font-medium">
                    Exportar seleccionados
                  </button>
                </div>
              </div>
              <button
                onClick={() => setSelectedSuppliers([])}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Cancelar selección
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Suppliers Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left p-4">
                  <input
                    type="checkbox"
                    checked={selectedSuppliers.length === filteredSuppliers.length && filteredSuppliers.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                  />
                </th>
                <th className="text-left p-4 font-semibold text-gray-900">Proveedor</th>
                <th className="text-left p-4 font-semibold text-gray-900">Contacto</th>
                <th className="text-left p-4 font-semibold text-gray-900">Estado</th>
                <th className="text-left p-4 font-semibold text-gray-900">Evaluación</th>
                <th className="text-left p-4 font-semibold text-gray-900">Registro</th>
                <th className="text-left p-4 font-semibold text-gray-900">Órdenes</th>
                <th className="text-left p-4 font-semibold text-gray-900">Volumen</th>
                <th className="text-left p-4 font-semibold text-gray-900">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredSuppliers.map((supplier) => (
                <tr key={supplier.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedSuppliers.includes(supplier.id)}
                      onChange={() => handleSelectSupplier(supplier.id)}
                      className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{supplier.name}</div>
                        <div className="text-sm text-gray-500">RUC: {supplier.ruc}</div>
                        <div className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                          <MapPin className="w-3 h-3" />
                          {supplier.location}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div>
                      <div className="font-medium text-gray-900">{supplier.contact.name}</div>
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {supplier.contact.email}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {supplier.contact.phone}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(supplier.status)}`}>
                      {getStatusIcon(supplier.status)}
                      <span>{getStatusLabel(supplier.status)}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${getEvaluationColor(supplier.evaluation)}`}>
                        <Star className="w-3 h-3 fill-current" />
                        <span>{supplier.rating}</span>
                      </div>
                      <span className="text-xs text-gray-500 capitalize">{supplier.evaluation}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(supplier.registrationDate)}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="font-semibold text-gray-900">{supplier.ordersCompleted}</div>
                    <div className="text-sm text-gray-500">completadas</div>
                  </td>
                  <td className="p-4">
                    <div className="font-semibold text-gray-900">{formatCurrency(supplier.totalVolume)}</div>
                    <div className="text-sm text-gray-500">total</div>
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
        {filteredSuppliers.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron proveedores</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || selectedStatus !== 'todos' 
                ? 'Intenta ajustar los filtros de búsqueda'
                : 'Comienza registrando tu primer proveedor'
              }
            </p>
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
              <Plus className="w-4 h-4" />
              <span>Nuevo Proveedor</span>
            </button>
          </div>
        )}

        {/* Pagination */}
        {filteredSuppliers.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Mostrando {filteredSuppliers.length} de {suppliers.length} proveedores
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

export default Suppliers;