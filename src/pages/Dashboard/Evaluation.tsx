// pages/Dashboard/Evaluation.tsx
import React, { useState } from 'react';
import {
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Star,
  TrendingUp,
  TrendingDown,
  Target,
  Award,
  Clock,
  AlertTriangle,
  BarChart3,
  PieChart,
  LineChart,
  Building2,
  ChevronDown,
  MoreHorizontal,
  ThumbsUp,
  ThumbsDown,
  Crown,
  Medal,
  Lightbulb,
  FileText,
  Minus
} from 'lucide-react';

// Tipos de datos
interface SupplierEvaluation {
  id: string;
  supplier: {
    name: string;
    id: string;
    category: string;
  };
  overallScore: number;
  trend: 'up' | 'down' | 'stable';
  lastEvaluation: string;
  nextEvaluation: string;
  status: 'excelente' | 'bueno' | 'regular' | 'deficiente' | 'critico';
  metrics: {
    quality: number;
    delivery: number;
    pricing: number;
    communication: number;
    innovation: number;
  };
  totalOrders: number;
  completedOrders: number;
  onTimeDelivery: number;
  issuesReported: number;
  certifications: string[];
  improvementAreas: string[];
}

interface KPI {
  title: string;
  value: string;
  change: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
  trend: 'up' | 'down' | 'neutral';
}

// Tipo para los estados de evaluación
type EvaluationStatus = 'excelente' | 'bueno' | 'regular' | 'deficiente' | 'critico';

const Evaluation: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('todos');
  const [selectedSuppliers, setSelectedSuppliers] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'resumen' | 'detallado' | 'comparativa' | 'tendencias'>('resumen');
  const [timeRange, setTimeRange] = useState<'semanal' | 'mensual' | 'trimestral' | 'anual'>('mensual');

  // Datos de ejemplo
  const evaluations: SupplierEvaluation[] = [
    {
      id: '1',
      supplier: {
        name: 'Ferreterías del Norte SAC',
        id: 'SUP001',
        category: 'Materiales de Construcción'
      },
      overallScore: 4.8,
      trend: 'up',
      lastEvaluation: '2024-04-10',
      nextEvaluation: '2024-07-10',
      status: 'excelente',
      metrics: {
        quality: 4.9,
        delivery: 4.7,
        pricing: 4.6,
        communication: 4.8,
        innovation: 4.5
      },
      totalOrders: 156,
      completedOrders: 154,
      onTimeDelivery: 98.7,
      issuesReported: 2,
      certifications: ['ISO 9001', 'Buenas Prácticas'],
      improvementAreas: ['Innovación en productos']
    },
    {
      id: '2',
      supplier: {
        name: 'Materiales Premium Ltda',
        id: 'SUP002',
        category: 'Herramientas y Equipos'
      },
      overallScore: 4.5,
      trend: 'stable',
      lastEvaluation: '2024-04-08',
      nextEvaluation: '2024-07-08',
      status: 'bueno',
      metrics: {
        quality: 4.6,
        delivery: 4.4,
        pricing: 4.3,
        communication: 4.5,
        innovation: 4.2
      },
      totalOrders: 89,
      completedOrders: 87,
      onTimeDelivery: 95.2,
      issuesReported: 5,
      certifications: ['ISO 14001'],
      improvementAreas: ['Tiempos de entrega', 'Comunicación']
    },
    {
      id: '3',
      supplier: {
        name: 'Construcciones Modernas SRL',
        id: 'SUP003',
        category: 'Servicios de Construcción'
      },
      overallScore: 3.8,
      trend: 'down',
      lastEvaluation: '2024-04-05',
      nextEvaluation: '2024-07-05',
      status: 'regular',
      metrics: {
        quality: 3.9,
        delivery: 3.5,
        pricing: 4.0,
        communication: 3.7,
        innovation: 3.2
      },
      totalOrders: 34,
      completedOrders: 32,
      onTimeDelivery: 87.5,
      issuesReported: 8,
      certifications: [],
      improvementAreas: ['Calidad consistente', 'Innovación', 'Comunicación']
    },
    {
      id: '4',
      supplier: {
        name: 'Suministros Industriales Corp',
        id: 'SUP004',
        category: 'Equipos Industriales'
      },
      overallScore: 4.9,
      trend: 'up',
      lastEvaluation: '2024-04-12',
      nextEvaluation: '2024-07-12',
      status: 'excelente',
      metrics: {
        quality: 5.0,
        delivery: 4.8,
        pricing: 4.7,
        communication: 4.9,
        innovation: 4.8
      },
      totalOrders: 201,
      completedOrders: 200,
      onTimeDelivery: 99.5,
      issuesReported: 1,
      certifications: ['ISO 9001', 'ISO 14001', 'OHSAS 18001'],
      improvementAreas: []
    },
    {
      id: '5',
      supplier: {
        name: 'Distribuidora El Martillo',
        id: 'SUP005',
        category: 'Ferretería General'
      },
      overallScore: 2.9,
      trend: 'down',
      lastEvaluation: '2024-04-03',
      nextEvaluation: '2024-05-03',
      status: 'deficiente',
      metrics: {
        quality: 2.8,
        delivery: 2.5,
        pricing: 3.2,
        communication: 3.0,
        innovation: 2.5
      },
      totalOrders: 67,
      completedOrders: 62,
      onTimeDelivery: 75.8,
      issuesReported: 15,
      certifications: [],
      improvementAreas: ['Calidad', 'Puntualidad', 'Comunicación', 'Precios competitivos']
    }
  ];

  const kpis: KPI[] = [
    {
      title: 'Score Promedio',
      value: '4.38',
      change: '+0.12 vs último mes',
      icon: Star,
      color: 'bg-yellow-500',
      trend: 'up'
    },
    {
      title: 'Proveedores Excelentes',
      value: '42%',
      change: '+8% vs trimestre anterior',
      icon: Award,
      color: 'bg-green-500',
      trend: 'up'
    },
    {
      title: 'Evaluaciones Pendientes',
      value: '23',
      change: '5 vencen esta semana',
      icon: Clock,
      color: 'bg-orange-500',
      trend: 'neutral'
    },
    {
      title: 'Tasa de Mejora',
      value: '68%',
      change: '+15% vs año anterior',
      icon: TrendingUp,
      color: 'bg-blue-500',
      trend: 'up'
    }
  ];

  // Funciones auxiliares
  const getStatusColor = (status: EvaluationStatus) => {
    switch (status) {
      case 'excelente': return 'bg-green-100 text-green-800';
      case 'bueno': return 'bg-blue-100 text-blue-800';
      case 'regular': return 'bg-yellow-100 text-yellow-800';
      case 'deficiente': return 'bg-orange-100 text-orange-800';
      case 'critico': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: EvaluationStatus) => {
    switch (status) {
      case 'excelente': return <Crown className="w-4 h-4" />;
      case 'bueno': return <ThumbsUp className="w-4 h-4" />;
      case 'regular': return <Target className="w-4 h-4" />;
      case 'deficiente': return <ThumbsDown className="w-4 h-4" />;
      case 'critico': return <AlertTriangle className="w-4 h-4" />;
      default: return <Target className="w-4 h-4" />;
    }
  };

  const getStatusLabel = (status: EvaluationStatus) => {
    const labels: Record<EvaluationStatus, string> = {
      'excelente': 'Excelente',
      'bueno': 'Bueno',
      'regular': 'Regular',
      'deficiente': 'Deficiente',
      'critico': 'Crítico'
    };
    return labels[status];
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-500" />;
      case 'stable': return <Minus className="w-4 h-4 text-gray-500" />;
      default: return <TrendingUp className="w-4 h-4" />;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 4.5) return 'text-green-600';
    if (score >= 4.0) return 'text-blue-600';
    if (score >= 3.5) return 'text-yellow-600';
    if (score >= 3.0) return 'text-orange-600';
    return 'text-red-600';
  };

  const getMetricColor = (score: number) => {
    if (score >= 4.5) return 'bg-green-500';
    if (score >= 4.0) return 'bg-blue-500';
    if (score >= 3.5) return 'bg-yellow-500';
    if (score >= 3.0) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-PE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const renderStars = (score: number) => {
    const stars = [];
    const fullStars = Math.floor(score);
    const hasHalfStar = score % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-4 h-4 fill-current text-yellow-500" />);
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-4 h-4 fill-current text-yellow-500" />);
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }

    return stars;
  };

  const filteredEvaluations = evaluations.filter(evaluationItem => {
    const matchesSearch = evaluationItem.supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         evaluationItem.supplier.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         evaluationItem.supplier.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'todos' || evaluationItem.status === selectedStatus;
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
    if (selectedSuppliers.length === filteredEvaluations.length) {
      setSelectedSuppliers([]);
    } else {
      setSelectedSuppliers(filteredEvaluations.map(evaluationItem => evaluationItem.id));
    }
  };

  // Lista de estados para el gráfico de distribución
  const statusList: EvaluationStatus[] = ['excelente', 'bueno', 'regular', 'deficiente', 'critico'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Evaluación de Desempeño</h1>
            <p className="text-gray-600 mt-1">Evalúa el rendimiento y calidad de proveedores</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4" />
              <span>Exportar Reporte</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
              <Plus className="w-4 h-4" />
              <span>Nueva Evaluación</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs de Navegación */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('resumen')}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'resumen'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Resumen General
              </div>
            </button>
            <button
              onClick={() => setActiveTab('detallado')}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'detallado'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <PieChart className="w-4 h-4" />
                Vista Detallada
              </div>
            </button>
            <button
              onClick={() => setActiveTab('comparativa')}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'comparativa'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <LineChart className="w-4 h-4" />
                Análisis Comparativo
              </div>
            </button>
            <button
              onClick={() => setActiveTab('tendencias')}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'tendencias'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Tendencias
              </div>
            </button>
          </nav>
        </div>
      </div>

      {/* Filtro de Tiempo */}
      <div className="flex justify-end">
        <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-300 p-1">
          {(['semanal', 'mensual', 'trimestral', 'anual'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                timeRange === range
                  ? 'bg-orange-500 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* KPIs Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;
          const TrendIcon = kpi.trend === 'up' ? TrendingUp : (kpi.trend === 'down' ? TrendingDown : TrendingUp);
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${kpi.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <TrendIcon className={`w-4 h-4 ${
                  kpi.trend === 'up' ? 'text-green-500' : 
                  kpi.trend === 'down' ? 'text-red-500' : 'text-gray-500'
                }`} />
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">{kpi.title}</p>
                <p className="text-3xl font-bold text-gray-900 mb-1">{kpi.value}</p>
                <p className="text-xs text-gray-500">{kpi.change}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dashboard de Métricas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Score Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Distribución de Scores</h3>
          <div className="space-y-3">
            {statusList.map((status) => {
              const count = evaluations.filter(evaluationItem => evaluationItem.status === status).length;
              const percentage = (count / evaluations.length) * 100;
              return (
                <div key={status} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(status).split(' ')[0]}`}></div>
                    <span className="text-sm text-gray-600 capitalize">{status}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${getStatusColor(status).split(' ')[0]}`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 w-8">{count}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Métricas de Evaluación</h3>
          <div className="space-y-4">
            {['Calidad', 'Entrega', 'Precio', 'Comunicación', 'Innovación'].map((metric) => {
              const metricKey = metric.toLowerCase() as keyof typeof evaluations[0]['metrics'];
              const avgScore = evaluations.reduce((sum, evaluationItem) => {
                return sum + evaluationItem.metrics[metricKey];
              }, 0) / evaluations.length;
              
              return (
                <div key={metric} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{metric}</span>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {renderStars(avgScore)}
                    </div>
                    <span className={`text-sm font-medium ${getScoreColor(avgScore)} w-12 text-right`}>
                      {avgScore.toFixed(1)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Proveedores Destacados */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Proveedores Destacados</h3>
          <div className="space-y-3">
            {evaluations
              .filter(evaluationItem => evaluationItem.status === 'excelente')
              .slice(0, 3)
              .map((evaluationItem) => (
                <div key={evaluationItem.id} className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <Crown className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{evaluationItem.supplier.name}</div>
                      <div className="text-sm text-gray-600">{evaluationItem.overallScore.toFixed(1)}/5.0</div>
                    </div>
                  </div>
                  <Medal className="w-5 h-5 text-yellow-500" />
                </div>
              ))}
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
                placeholder="Buscar por nombre de proveedor, ID o categoría..."
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
                <option value="excelente">Excelente</option>
                <option value="bueno">Bueno</option>
                <option value="regular">Regular</option>
                <option value="deficiente">Deficiente</option>
                <option value="critico">Crítico</option>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Score Mínimo</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none">
                    <option value="">Cualquier score</option>
                    <option value="4.5">Excelente (4.5+)</option>
                    <option value="4.0">Bueno (4.0+)</option>
                    <option value="3.5">Regular (3.5+)</option>
                    <option value="3.0">Mínimo (3.0+)</option>
                  </select>
                </div>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Evaluación desde</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Certificaciones</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none">
                    <option value="">Todas</option>
                    <option value="iso9001">ISO 9001</option>
                    <option value="iso14001">ISO 14001</option>
                    <option value="ohsas">OHSAS 18001</option>
                    <option value="certified">Con certificación</option>
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
                    Programar evaluación
                  </button>
                  <button className="text-sm text-orange-600 hover:text-orange-700 font-medium">
                    Enviar feedback
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

      {/* Evaluations Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left p-4">
                  <input
                    type="checkbox"
                    checked={selectedSuppliers.length === filteredEvaluations.length && filteredEvaluations.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                  />
                </th>
                <th className="text-left p-4 font-semibold text-gray-900">Proveedor</th>
                <th className="text-left p-4 font-semibold text-gray-900">Score General</th>
                <th className="text-left p-4 font-semibold text-gray-900">Métricas</th>
                <th className="text-left p-4 font-semibold text-gray-900">Estado</th>
                <th className="text-left p-4 font-semibold text-gray-900">Próxima Evaluación</th>
                <th className="text-left p-4 font-semibold text-gray-900">Rendimiento</th>
                <th className="text-left p-4 font-semibold text-gray-900">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvaluations.map((evaluationItem) => (
                <tr key={evaluationItem.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedSuppliers.includes(evaluationItem.id)}
                      onChange={() => handleSelectSupplier(evaluationItem.id)}
                      className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{evaluationItem.supplier.name}</div>
                        <div className="text-sm text-gray-500">ID: {evaluationItem.supplier.id}</div>
                        <div className="text-sm text-gray-500">{evaluationItem.supplier.category}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {renderStars(evaluationItem.overallScore)}
                      </div>
                      <div className="text-right">
                        <div className={`text-xl font-bold ${getScoreColor(evaluationItem.overallScore)}`}>
                          {evaluationItem.overallScore.toFixed(1)}
                        </div>
                        <div className="text-xs text-gray-500">/5.0</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(evaluationItem.metrics).map(([key, value]) => (
                        <div key={key} className="flex items-center gap-1">
                          <div className={`w-2 h-2 rounded-full ${getMetricColor(value)}`}></div>
                          <span className="text-xs text-gray-600 capitalize">{key}:</span>
                          <span className="text-xs font-medium">{value.toFixed(1)}</span>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(evaluationItem.status)}`}>
                      {getStatusIcon(evaluationItem.status)}
                      <span>{getStatusLabel(evaluationItem.status)}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-gray-900">{formatDate(evaluationItem.nextEvaluation)}</div>
                    <div className="text-xs text-gray-500">
                      Última: {formatDate(evaluationItem.lastEvaluation)}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        {getTrendIcon(evaluationItem.trend)}
                        <span className="text-sm text-gray-600">Tendencia</span>
                      </div>
                      <div className="text-sm text-gray-900">
                        {evaluationItem.completedOrders}/{evaluationItem.totalOrders} órdenes
                      </div>
                      <div className="text-sm text-gray-600">
                        {evaluationItem.onTimeDelivery}% puntualidad
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1 text-gray-400 hover:text-blue-600 rounded transition-colors" title="Ver evaluación completa">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-green-600 rounded transition-colors" title="Editar evaluación">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-purple-600 rounded transition-colors" title="Generar reporte">
                        <FileText className="w-4 h-4" />
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
        {filteredEvaluations.length === 0 && (
          <div className="text-center py-12">
            <Award className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron evaluaciones</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || selectedStatus !== 'todos' 
                ? 'Intenta ajustar los filtros de búsqueda'
                : 'Comienza creando tu primera evaluación'
              }
            </p>
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
              <Plus className="w-4 h-4" />
              <span>Nueva Evaluación</span>
            </button>
          </div>
        )}

        {/* Pagination */}
        {filteredEvaluations.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Mostrando {filteredEvaluations.length} de {evaluations.length} evaluaciones
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

      {/* Áreas de Mejora Global */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Áreas de Mejora Identificadas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { area: 'Comunicación', count: 8, priority: 'alta' },
            { area: 'Innovación', count: 12, priority: 'media' },
            { area: 'Tiempos de Entrega', count: 6, priority: 'alta' },
            { area: 'Calidad Consistente', count: 9, priority: 'media' }
          ].map((item, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">{item.area}</h4>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  item.priority === 'alta' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {item.priority === 'alta' ? 'Alta' : 'Media'}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{item.count} proveedores requieren mejora</p>
              <button className="text-sm text-orange-600 hover:text-orange-700 font-medium flex items-center gap-1">
                <Lightbulb className="w-4 h-4" />
                Ver plan de acción
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Evaluation;