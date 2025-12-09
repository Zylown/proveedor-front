import { useEffect, useState } from 'react'
import { LuBuilding } from 'react-icons/lu'
import {
  AiOutlineShoppingCart,
  AiOutlineTruck,
  AiOutlineWarning,
  AiOutlineCheckCircle,
  AiOutlineClockCircle
} from 'react-icons/ai'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts'
import Card from '../components/Card'

const ToMoney = (num: number | string | undefined) => {
  const n = Number(num ?? 0)
  return n.toLocaleString('es-ES', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}

export default function DashboardLayout() {
  const [data, setData] = useState<{
    total_proveedores?: number
    ordenes_activas?: number
    nuevas_hoy?: number
    entregas_pendientes?: number
    retrasadas?: number
    pagos_pendientes?: number
    facturas_vencidas?: number
  } | null>(null)

  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [chartData, setChartData] = useState<
    { dia: string; ordenes: number }[]
  >([])
  //@ts-ignore
  const [proveedores, setProveedores] = useState<any[]>([])
  const [actividadReciente, setActividadReciente] = useState<any>(null)
  const [loadingActividad, setLoadingActividad] = useState(true)

  const Spinner = () => (
    <div className="flex justify-center">
      <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  )

  //@ts-ignore
  const [loadingProveedores, setLoadingProveedores] = useState(true)

  const [proveedoresDestacados, setProveedoresDestacados] = useState<any>(null)

  //url desarrollo
  const API_URL = "http://localhost:3000";
  // url produccion
  // const API_URL = 'https://proveedor-back-a1051c0b9289.herokuapp.com'

  //  ------ Fetch Data --------
  useEffect(() => {
    async function fetchProveedoresDestacados() {
      try {
        const res = await fetch(`${API_URL}/dashboard/proveedores-destacados`)
        const json = await res.json()
        setProveedoresDestacados(json)
      } catch (err) {
        console.error(
          'Error al obtener proveedores destacados:',
          (err as Error).message
        )
      }
    }
    fetchProveedoresDestacados()
  }, [])

  useEffect(() => {
    async function fetchProveedores() {
      try {
        const res = await fetch(
          `${API_URL}/proveedor/listar/con-categoria/lista-completa`
        )
        const json = await res.json()
        setProveedores(json)
      } catch (err) {
        console.error('Error :', (err as Error).message)
      } finally {
        setLoadingProveedores(false)
      }
    }
    fetchProveedores()
  }, [])

  useEffect(() => {
    async function init() {
      try {
        const res = await fetch(`${API_URL}/dashboard/kpis`)
        const json = await res.json()
        setData(json)
      } catch (err) {
        console.error('Error :', (err as Error).message)
      } finally {
        setLoading(false)
      }
    }
    init()
  }, [])

  useEffect(() => {
    async function fetchActividadReciente() {
      try {
        const res = await fetch(`${API_URL}/dashboard/actividad-reciente`)
        const json = await res.json()
        setActividadReciente(json)
      } catch (err) {
        console.error(
          'Error al obtener actividad reciente:',
          (err as Error).message
        )
      } finally {
        setLoadingActividad(false)
      }
    }
    fetchActividadReciente()
  }, [])

  useEffect(() => {
    const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']
    const randomData = days.map(dia => ({
      dia,
      ordenes: Math.floor(Math.random() * 80) + 20
    }))
    setChartData(randomData)
  }, [])

  // -------- Calcular tiempo relativo --------
  const timeAgo = (dateString: string) => {
    const now = new Date()
    const date = new Date(dateString)
    const diffMs = now.getTime() - date.getTime()

    const seconds = Math.floor(diffMs / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (seconds < 60) return 'Hace unos segundos'
    if (minutes < 60) return `Hace ${minutes} min${minutes > 1 ? 's' : ''}`
    if (hours < 24) return `Hace ${hours} hora${hours > 1 ? 's' : ''}`
    return `Hace ${days} día${days > 1 ? 's' : ''}`
  }

  // -------- Formulario Nuevo Proveedor ----------
  const [form, setForm] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    rubro: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Nuevo proveedor:', form)
    setShowForm(false)
    setForm({ nombre: '', correo: '', telefono: '', rubro: '' })
  }

  return (
    <div className="flex flex-col gap-6 p-4">
      <header className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card
          title="Total Proveedores"
          // @ts-ignore
          value={loading ? <Spinner /> : data?.total_proveedores || '0'}
          icon={<LuBuilding />}
          footer="+12% desde el mes pasado"
        />

        <Card
          title="Órdenes Activas"
          // @ts-ignore
          value={loading ? <Spinner /> : data?.ordenes_activas || '0'}
          icon={<AiOutlineShoppingCart />}
          //@ts-ignore
          footer={
            loading ? (
              <span className="text-gray-400 text-sm">Cargando...</span>
            ) : (
              `${data?.nuevas_hoy || '0'} nuevas hoy`
            )
          }
        />

        <Card
          title="Entregas Pendientes"
          //@ts-ignore
          value={loading ? <Spinner /> : data?.entregas_pendientes || '0'}
          icon={<AiOutlineTruck />}
          //@ts-ignore
          footer={
            loading ? (
              <span className="text-gray-400 text-sm">Cargando...</span>
            ) : (
              `${data?.retrasadas || '0'} con retraso`
            )
          }
        />

        <Card
          title="Pagos Pendientes"
          //@ts-ignore
          value={
            loading ? (
              <Spinner />
            ) : (
              `$${ToMoney(data?.pagos_pendientes) || '0.00'}`
            )
          }
          icon={<AiOutlineWarning />}
          //@ts-ignore
          footer={
            loading ? (
              <span className="text-gray-400 text-sm">Cargando...</span>
            ) : (
              `${data?.facturas_vencidas || '0'} facturas vencidas`
            )
          }
        />
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* -------- ACTIVIDAD RECIENTE -------- */}
        <Card
          title="Actividad Reciente"
          subtitle="Últimas notificaciones y actualizaciones"
        >
          {loadingActividad ? (
            <div className="flex justify-center py-6">
              <Spinner />
            </div>
          ) : (
            <ul className="space-y-4">
              {actividadReciente && (
                <>
                  <li className="flex items-center gap-2">
                    <AiOutlineCheckCircle className="text-green-500 text-lg" />
                    <div>
                      <p className="text-gray-700 font-medium">
                        {actividadReciente.ultimaOrdenCompletada?.titulo}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {actividadReciente.ultimaOrdenCompletada?.subtitulo}
                      </p>
                      <p className="text-gray-400 text-xs">
                        {timeAgo(actividadReciente.ultimaOrdenCompletada?.ts)}
                      </p>
                    </div>
                  </li>

                  <li className="flex items-center gap-2">
                    <AiOutlineClockCircle className="text-yellow-500 text-lg" />
                    <div>
                      <p className="text-gray-700 font-medium">
                        {actividadReciente.ultimaEntregaRetrasada?.titulo}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {actividadReciente.ultimaEntregaRetrasada?.subtitulo}
                      </p>
                      <p className="text-gray-400 text-xs">
                        {timeAgo(actividadReciente.ultimaEntregaRetrasada?.ts)}
                      </p>
                    </div>
                  </li>

                  <li className="flex items-center gap-2">
                    <LuBuilding className="text-blue-500 text-lg" />
                    <div>
                      <p className="text-gray-700 font-medium">
                        {actividadReciente.ultimoProveedorNuevo?.titulo}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {actividadReciente.ultimoProveedorNuevo?.subtitulo}
                      </p>
                      <p className="text-gray-400 text-xs">
                        {timeAgo(actividadReciente.ultimoProveedorNuevo?.ts)}
                      </p>
                    </div>
                  </li>
                </>
              )}
            </ul>
          )}
        </Card>

        {/* -------- PROVEEDORES DESTACADOS -------- */}
        <Card
          title="Proveedores Destacados"
          subtitle="Mejor desempeño este mes"
        >
          {loadingProveedores ? (
            <div className="flex justify-center py-6">
              <Spinner />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
              {/* ======== COLUMNA: MEJOR DESEMPEÑO ======== */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <AiOutlineCheckCircle className="text-green-500" />
                  Mejor Desempeño
                </h4>

                {!proveedoresDestacados?.mejorDesempeno?.length ? (
                  <p className="text-gray-400 text-sm italic">
                    Sin proveedores destacados.
                  </p>
                ) : (
                  <ul className="space-y-5">
                    {proveedoresDestacados.mejorDesempeno.map(
                      (p: any, i: number) => (
                        <li
                          key={i}
                          className="flex justify-between items-start"
                        >
                          {/* Info izquierda */}
                          <div>
                            <p className="font-semibold text-gray-900 leading-tight">
                              {p.razon_social}
                            </p>
                            <p className="text-xs text-gray-500">
                              {p.ordenes_completadas_mes} órdenes •{' '}
                              {Number(p.calidad_promedio_mes).toFixed(2)}%
                              calidad
                            </p>
                          </div>

                          {/* Valor derecha */}
                          <p className="text-green-600 font-bold text-sm">
                            {Number(p.puntualidad_pct_mes).toFixed(2)}%
                          </p>
                        </li>
                      )
                    )}
                  </ul>
                )}
              </div>

              {/* ======== COLUMNA: MEJOR PUNTUALIDAD ======== */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <AiOutlineClockCircle className="text-blue-500" />
                  Mejor Puntualidad
                </h4>

                {!proveedoresDestacados?.mejorPuntualidad?.length ? (
                  <p className="text-gray-400 text-sm italic">
                    Sin proveedores destacados.
                  </p>
                ) : (
                  <ul className="space-y-5">
                    {proveedoresDestacados.mejorPuntualidad.map(
                      (p: any, i: number) => (
                        <li
                          key={i}
                          className="flex justify-between items-start"
                        >
                          <div>
                            <p className="font-semibold text-gray-900 leading-tight">
                              {p.razon_social}
                            </p>
                            <p className="text-xs text-gray-500">
                              {p.ordenes_completadas_mes} órdenes •{' '}
                              {Number(p.calidad_promedio_mes).toFixed(2)}%
                              calidad
                            </p>
                          </div>

                          <p className="text-blue-600 font-bold text-sm">
                            {Number(p.puntualidad_pct_mes).toFixed(2)}%
                          </p>
                        </li>
                      )
                    )}
                  </ul>
                )}
              </div>

              {/* ======== COLUMNA: MEJOR CALIDAD ======== */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <AiOutlineTruck className="text-purple-500" />
                  Mejor Calidad
                </h4>

                {!proveedoresDestacados?.mejorCalidad?.length ? (
                  <p className="text-gray-400 text-sm italic">
                    Sin proveedores destacados.
                  </p>
                ) : (
                  <ul className="space-y-5">
                    {proveedoresDestacados.mejorCalidad.map(
                      (p: any, i: number) => (
                        <li
                          key={i}
                          className="flex justify-between items-start"
                        >
                          <div>
                            <p className="font-semibold text-gray-900 leading-tight">
                              {p.razon_social}
                            </p>
                            <p className="text-xs text-gray-500">
                              {p.ordenes_completadas_mes} órdenes •{' '}
                              {Number(p.puntualidad_pct_mes).toFixed(2)}%
                              puntualidad
                            </p>
                          </div>

                          <p className="text-purple-600 font-bold text-sm">
                            {Number(p.calidad_promedio_mes).toFixed(2)}%
                          </p>
                        </li>
                      )
                    )}
                  </ul>
                )}
              </div>
            </div>
          )}
        </Card>
      </section>

      {/* -------  Expandible -------- */}
      <section>
        <Card title="Acciones Rápidas" subtitle="Tareas comunes del sistema">
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 mt-4">
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-azulbrillante text-white px-4 py-2 font-semibold rounded-lg hover:bg-blue-600 transition"
            >
              {showForm ? 'Cerrar Registro' : 'Registrar Nuevo Proveedor'}
            </button>
            <button className="text-blue-400 border border-blue-300 px-4 py-2 rounded-lg hover:bg-sky-100 hover:text-blue-900 transition">
              Crear Orden de Compra
            </button>
            <button className="text-green-400 border border-green-300 px-4 py-2 rounded-lg hover:bg-green-100 hover:text-blue-900 transition">
              Generar Reporte
            </button>
            <button className="text-orange-400 border border-orange-300 px-4 py-2 rounded-lg hover:bg-orange-100 hover:text-blue-900 transition">
              Revisar Facturas Pendientes
            </button>
          </div>

          {/* Formulario */}
          <div
            className={`transition-all duration-500 overflow-hidden ${
              showForm ? 'max-h-[500px] mt-6' : 'max-h-0'
            }`}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-gray-50 border rounded-lg p-4 space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="nombre"
                  placeholder="Nombre del proveedor"
                  value={form.nombre}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                />
                <input
                  type="email"
                  name="correo"
                  placeholder="Correo electrónico"
                  value={form.correo}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                />
                <input
                  type="tel"
                  name="telefono"
                  placeholder="Teléfono"
                  value={form.telefono}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                />
                <input
                  type="text"
                  name="rubro"
                  placeholder="Rubro / Sector"
                  value={form.rubro}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 rounded-lg border text-gray-500 hover:bg-gray-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </Card>
      </section>

      <section>
        <Card title="Análisis de Órdenes de Compra" subtitle="Volumen semanal">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="dia" tick={{ fill: '#6b7280' }} />
                <YAxis tick={{ fill: '#6b7280' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#f9fafb',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="ordenes"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </section>
    </div>
  )
}
