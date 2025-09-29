// pages/Dashboard/Billing.tsx
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
  DollarSign,
  CreditCard,
  Building2,
  ChevronDown,
  MoreHorizontal,
  FileText,
  TrendingUp,
  AlertTriangle,
  Send,
  Receipt,
  Banknote,
  Wallet
} from 'lucide-react';

// Tipos de datos
interface Invoice {
  id: string;
  invoiceNumber: string;
  supplier: {
    name: string;
    id: string;
  };
  issueDate: string;
  dueDate: string;
  amount: number;
  paidAmount: number;
  status: 'pendiente' | 'parcial' | 'pagada' | 'vencida' | 'cancelada';
  paymentMethod: 'transferencia' | 'cheque' | 'efectivo' | 'tarjeta';
  paymentDate?: string;
  daysOverdue: number;
  category: string;
}

interface PaymentStats {
  title: string;
  value: string;
  change: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
  trend: 'up' | 'down' | 'neutral';
}

const Billing: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('todas');
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'facturas' | 'pagos' | 'reportes'>('facturas');

  // Datos de ejemplo
  const invoices: Invoice[] = [
    {
      id: '1',
      invoiceNumber: 'F-2024-001',
      supplier: { name: 'Ferreterías del Norte SAC', id: 'SUP001' },
      issueDate: '2024-03-15',
      dueDate: '2024-04-15',
      amount: 15750.00,
      paidAmount: 15750.00,
      status: 'pagada',
      paymentMethod: 'transferencia',
      paymentDate: '2024-04-10',
      daysOverdue: 0,
      category: 'Materiales de Construcción'
    },
    {
      id: '2',
      invoiceNumber: 'F-2024-002',
      supplier: { name: 'Materiales Premium Ltda', id: 'SUP002' },
      issueDate: '2024-03-20',
      dueDate: '2024-04-20',
      amount: 8950.50,
      paidAmount: 4475.25,
      status: 'parcial',
      paymentMethod: 'transferencia',
      daysOverdue: 0,
      category: 'Herramientas'
    },
    {
      id: '3',
      invoiceNumber: 'F-2024-003',
      supplier: { name: 'Construcciones Modernas SRL', id: 'SUP003' },
      issueDate: '2024-03-10',
      dueDate: '2024-03-25',
      amount: 22300.75,
      paidAmount: 0,
      status: 'vencida',
      paymentMethod: 'cheque',
      daysOverdue: 16,
      category: 'Servicios'
    },
    {
      id: '4',
      invoiceNumber: 'F-2024-004',
      supplier: { name: 'Suministros Industriales Corp', id: 'SUP004' },
      issueDate: '2024-04-01',
      dueDate: '2024-04-30',
      amount: 5680.25,
      paidAmount: 0,
      status: 'pendiente',
      paymentMethod: 'transferencia',
      daysOverdue: 0,
      category: 'Equipos'
    },
    {
      id: '5',
      invoiceNumber: 'F-2024-005',
      supplier: { name: 'Distribuidora El Martillo', id: 'SUP005' },
      issueDate: '2024-03-28',
      dueDate: '2024-04-28',
      amount: 3200.00,
      paidAmount: 3200.00,
      status: 'pagada',
      paymentMethod: 'tarjeta',
      paymentDate: '2024-04-25',
      daysOverdue: 0,
      category: 'Materiales'
    },
    {
      id: '6',
      invoiceNumber: 'F-2024-006',
      supplier: { name: 'Tecnologías de Construcción SA', id: 'SUP006' },
      issueDate: '2024-03-22',
      dueDate: '2024-04-05',
      amount: 12500.00,
      paidAmount: 0,
      status: 'vencida',
      paymentMethod: 'transferencia',
      daysOverdue: 25,
      category: 'Tecnología'
    }
  ];

  const paymentStats: PaymentStats[] = [
    {
      title: 'Facturas Pendientes',
      value: '$42,380',
      change: '12 documentos',
      icon: Clock,
      color: 'bg-yellow-500',
      trend: 'up'
    },
    {
      title: 'Pagado Este Mes',
      value: '$89,450',
      change: '+15% vs mes anterior',
      icon: CheckCircle,
      color: 'bg-green-500',
      trend: 'up'
    },
    {
      title: 'Facturas Vencidas',
      value: '$34,800',
      change: '3 documentos críticos',
      icon: AlertTriangle,
      color: 'bg-red-500',
      trend: 'down'
    },
    {
      title: 'Flujo de Caja',
      value: '+$47,070',
      change: 'Balance positivo',
      icon: TrendingUp,
      color: 'bg-blue-500',
      trend: 'up'
    }
  ];

  // Funciones auxiliares
  const getStatusColor = (status: Invoice['status']) => {
    switch (status) {
      case 'pendiente': return 'bg-yellow-100 text-yellow-800';
      case 'parcial': return 'bg-blue-100 text-blue-800';
      case 'pagada': return 'bg-green-100 text-green-800';
      case 'vencida': return 'bg-red-100 text-red-800';
      case 'cancelada': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: Invoice['status']) => {
    switch (status) {
      case 'pendiente': return <Clock className="w-4 h-4" />;
      case 'parcial': return <DollarSign className="w-4 h-4" />;
      case 'pagada': return <CheckCircle className="w-4 h-4" />;
      case 'vencida': return <AlertTriangle className="w-4 h-4" />;
      case 'cancelada': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusLabel = (status: Invoice['status']) => {
    const labels = {
      'pendiente': 'Pendiente',
      'parcial': 'Pago Parcial',
      'pagada': 'Pagada',
      'vencida': 'Vencida',
      'cancelada': 'Cancelada'
    };
    return labels[status];
  };

  const getPaymentMethodIcon = (method: Invoice['paymentMethod']) => {
    switch (method) {
      case 'transferencia': return <Send className="w-4 h-4" />;
      case 'cheque': return <Receipt className="w-4 h-4" />;
      case 'efectivo': return <Banknote className="w-4 h-4" />;
      case 'tarjeta': return <CreditCard className="w-4 h-4" />;
      default: return <Wallet className="w-4 h-4" />;
    }
  };

  const getPaymentMethodLabel = (method: Invoice['paymentMethod']) => {
    const labels = {
      'transferencia': 'Transferencia',
      'cheque': 'Cheque',
      'efectivo': 'Efectivo',
      'tarjeta': 'Tarjeta'
    };
    return labels[method];
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

  const getProgressPercentage = (invoice: Invoice) => {
    return (invoice.paidAmount / invoice.amount) * 100;
  };

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'todas' || invoice.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleSelectInvoice = (invoiceId: string) => {
    setSelectedInvoices(prev => 
      prev.includes(invoiceId) 
        ? prev.filter(id => id !== invoiceId)
        : [...prev, invoiceId]
    );
  };

  const handleSelectAll = () => {
    if (selectedInvoices.length === filteredInvoices.length) {
      setSelectedInvoices([]);
    } else {
      setSelectedInvoices(filteredInvoices.map(invoice => invoice.id));
    }
  };

  // Calcular totales
  const totalPending = invoices.filter(i => i.status === 'pendiente').reduce((sum, i) => sum + i.amount, 0);
  const totalOverdue = invoices.filter(i => i.status === 'vencida').reduce((sum, i) => sum + i.amount, 0);
  const totalPaid = invoices.filter(i => i.status === 'pagada').reduce((sum, i) => sum + i.paidAmount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Facturación y Pagos</h1>
            <p className="text-gray-600 mt-1">Control de facturación y estados de pago</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4" />
              <span>Exportar Reporte</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
              <Plus className="w-4 h-4" />
              <span>Registrar Pago</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs de Navegación */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('facturas')}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'facturas'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <Receipt className="w-4 h-4" />
                Facturas y Documentos
              </div>
            </button>
            <button
              onClick={() => setActiveTab('pagos')}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'pagos'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                Historial de Pagos
              </div>
            </button>
            <button
              onClick={() => setActiveTab('reportes')}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'reportes'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Reportes Financieros
              </div>
            </button>
          </nav>
        </div>
      </div>

      {/* Stats Cards con enfoque financiero */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {paymentStats.map((stat, index) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === 'up' ? TrendingUp : (stat.trend === 'down' ? TrendingUp : TrendingUp);
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

      {/* Resumen Rápido */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Por Vencer</p>
              <p className="text-2xl font-bold">{formatCurrency(totalPending)}</p>
            </div>
            <Clock className="w-8 h-8 text-orange-200" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100 text-sm">Vencidas</p>
              <p className="text-2xl font-bold">{formatCurrency(totalOverdue)}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-200" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Pagado (Mes)</p>
              <p className="text-2xl font-bold">{formatCurrency(totalPaid)}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-200" />
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
                placeholder="Buscar por número de factura, proveedor o categoría..."
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
                <option value="parcial">Pago Parcial</option>
                <option value="pagada">Pagada</option>
                <option value="vencida">Vencida</option>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Monto mínimo</label>
                  <input
                    type="number"
                    placeholder="S/ 0.00"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Método de pago</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none">
                    <option value="">Todos los métodos</option>
                    <option value="transferencia">Transferencia</option>
                    <option value="cheque">Cheque</option>
                    <option value="efectivo">Efectivo</option>
                    <option value="tarjeta">Tarjeta</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bulk Actions */}
        {selectedInvoices.length > 0 && (
          <div className="px-6 py-3 bg-orange-50 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-orange-700">
                  {selectedInvoices.length} facturas seleccionadas
                </span>
                <div className="flex gap-2">
                  <button className="text-sm text-orange-600 hover:text-orange-700 font-medium">
                    Programar pago
                  </button>
                  <button className="text-sm text-orange-600 hover:text-orange-700 font-medium">
                    Descargar seleccionadas
                  </button>
                  <button className="text-sm text-orange-600 hover:text-orange-700 font-medium">
                    Enviar recordatorio
                  </button>
                </div>
              </div>
              <button
                onClick={() => setSelectedInvoices([])}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Cancelar selección
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left p-4">
                  <input
                    type="checkbox"
                    checked={selectedInvoices.length === filteredInvoices.length && filteredInvoices.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                  />
                </th>
                <th className="text-left p-4 font-semibold text-gray-900">Factura</th>
                <th className="text-left p-4 font-semibold text-gray-900">Proveedor</th>
                <th className="text-left p-4 font-semibold text-gray-900">Fechas</th>
                <th className="text-left p-4 font-semibold text-gray-900">Estado de Pago</th>
                <th className="text-left p-4 font-semibold text-gray-900">Método</th>
                <th className="text-left p-4 font-semibold text-gray-900">Monto</th>
                <th className="text-left p-4 font-semibold text-gray-900">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedInvoices.includes(invoice.id)}
                      onChange={() => handleSelectInvoice(invoice.id)}
                      className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                    />
                  </td>
                  <td className="p-4">
                    <div>
                      <div className="font-semibold text-gray-900">{invoice.invoiceNumber}</div>
                      <div className="text-sm text-gray-500">{invoice.category}</div>
                      {invoice.daysOverdue > 0 && (
                        <div className="text-xs text-red-600 font-medium mt-1">
                          +{invoice.daysOverdue} días de retraso
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <Building2 className="w-4 h-4 text-orange-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{invoice.supplier.name}</div>
                        <div className="text-sm text-gray-500">ID: {invoice.supplier.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-1">
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Emisión:</span> {formatDate(invoice.issueDate)}
                      </div>
                      <div className={`text-sm ${
                        invoice.status === 'vencida' ? 'text-red-600 font-medium' : 'text-gray-600'
                      }`}>
                        <span className="font-medium">Vence:</span> {formatDate(invoice.dueDate)}
                      </div>
                      {invoice.paymentDate && (
                        <div className="text-sm text-green-600">
                          <span className="font-medium">Pagado:</span> {formatDate(invoice.paymentDate)}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-2">
                      <div className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                        {getStatusIcon(invoice.status)}
                        <span>{getStatusLabel(invoice.status)}</span>
                      </div>
                      {invoice.status === 'parcial' && (
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${getProgressPercentage(invoice)}%` }}
                          ></div>
                        </div>
                      )}
                      <div className="text-xs text-gray-500">
                        {formatCurrency(invoice.paidAmount)} / {formatCurrency(invoice.amount)}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      {getPaymentMethodIcon(invoice.paymentMethod)}
                      <span>{getPaymentMethodLabel(invoice.paymentMethod)}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="font-semibold text-gray-900">{formatCurrency(invoice.amount)}</div>
                    <div className="text-sm text-gray-500">total</div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1 text-gray-400 hover:text-blue-600 rounded transition-colors" title="Ver factura">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-green-600 rounded transition-colors" title="Registrar pago">
                        <DollarSign className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-purple-600 rounded transition-colors" title="Descargar">
                        <Download className="w-4 h-4" />
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
        {filteredInvoices.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron facturas</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || selectedStatus !== 'todas' 
                ? 'Intenta ajustar los filtros de búsqueda'
                : 'Comienza registrando tu primera factura'
              }
            </p>
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
              <Plus className="w-4 h-4" />
              <span>Registrar Factura</span>
            </button>
          </div>
        )}

        {/* Pagination */}
        {filteredInvoices.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Mostrando {filteredInvoices.length} de {invoices.length} facturas
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

export default Billing;