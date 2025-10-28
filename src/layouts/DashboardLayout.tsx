import { useEffect, useState } from "react";
import { LuBuilding } from "react-icons/lu";
import {
  AiOutlineShoppingCart,
  AiOutlineTruck,
  AiOutlineWarning,
  AiOutlineCheckCircle,
  AiOutlineClockCircle,
} from "react-icons/ai";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import Card from "../components/Card";

export default function DashboardLayout() {
  const [data, setData] = useState<{
    ordenes_activas?: number;
    nuevas_hoy?: number;
    entregas_pendientes?: number;
    retrasadas?: number;
    pagos_pendientes?: number;
    facturas_vencidas?: number;
  } | null>(null);

  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [chartData, setChartData] = useState<
    { dia: string; ordenes: number }[]
  >([]);
  const [proveedores, setProveedores] = useState<any[]>([]);
  const Spinner = () => (
    <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin inline-block" />
  );
  //@ts-ignore
  const [loadingProveedores, setLoadingProveedores] = useState(true);
  useEffect(() => {
    async function fetchProveedores() {
      try {
        const res = await fetch(
          "https://proveedor-back-a1051c0b9289.herokuapp.com/proveedor/listar/con-categoria"
        );
        const json = await res.json();
        setProveedores(json);
      } catch (err) {
        console.error("Error :", (err as Error).message);
      } finally {
        setLoadingProveedores(false);
      }
    }
    fetchProveedores();
  }, []);

  useEffect(() => {
    async function init() {
      try {
        const res = await fetch(
          "https://proveedor-back-a1051c0b9289.herokuapp.com/dashboard/kpis"
        );
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Error :", (err as Error).message);
      } finally {
        setLoading(false);
      }
    }
    init();
  }, []);

  useEffect(() => {
    const days = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
    const randomData = days.map((dia) => ({
      dia,
      ordenes: Math.floor(Math.random() * 80) + 20,
    }));
    setChartData(randomData);
  }, []);

  const SmallSpinner = () => (
    <div className="flex justify-center">
      <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  // -------- Formulario Nuevo Proveedor ----------
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    rubro: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Nuevo proveedor:", form);
    setShowForm(false);
    setForm({ nombre: "", correo: "", telefono: "", rubro: "" });
  };

  return (
    <div className="flex flex-col gap-6 p-4">
      <header className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card
  title="Total Proveedores"
  value="247"
  icon={<LuBuilding />}
  footer="+12% desde el mes pasado"
  color="#1E90FF" // azul
/>

<Card
  title="Órdenes Activas"
  //@ts-ignore
  value={loading ? <SmallSpinner /> : data?.ordenes_activas || "0"}
  icon={<AiOutlineShoppingCart />}
  //@ts-ignore
  footer={
    loading ? (
      <span className="text-gray-400 text-sm">Cargando...</span>
    ) : (
      `${data?.nuevas_hoy || "0"} nuevas hoy`
    )
  }
  color="#4CAF50" // verde
/>

<Card
  title="Entregas Pendientes"
  //@ts-ignore
  value={loading ? <SmallSpinner /> : data?.entregas_pendientes || "0"}
  icon={<AiOutlineTruck />}
  //@ts-ignore
  footer={
    loading ? (
      <span className="text-gray-400 text-sm">Cargando...</span>
    ) : (
      `${data?.retrasadas || "0"} con retraso`
    )
  }
  color="#FFA500" // naranja
/>

<Card
  title="Pagos Pendientes"
  //@ts-ignore
  value={
    loading ? <SmallSpinner /> : `$${data?.pagos_pendientes || "0.00"}`
  }
  icon={<AiOutlineWarning />}
  //@ts-ignore
  footer={
    loading ? (
      <span className="text-gray-400 text-sm">Cargando...</span>
    ) : (
      `${data?.facturas_vencidas || "0"} facturas vencidas`
    )
  }
  color="#E53935" // rojo
/>

      </header>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card
          title="Actividad Reciente"
          subtitle="Últimas notificaciones y actualizaciones"
        >
          <ul className="space-y-4">
            <li className="flex items-center gap-2">
              <AiOutlineCheckCircle className="text-green-500 text-lg" />
              <div>
                <p className="text-gray-700">Orden #1234 completada</p>
                <p className="text-gray-500 text-xs">
                  Proveedor: Suministros ABC - Hace 2 horas
                </p>
              </div>
            </li>
            <li className="flex items-center gap-2">
              <AiOutlineClockCircle className="text-yellow-500 text-lg" />
              <div>
                <p className="text-gray-700">Entrega retrasada</p>
                <p className="text-gray-500 text-xs">
                  Orden #1235 - Estimado: mañana
                </p>
              </div>
            </li>
            <li className="flex items-center gap-2">
              <LuBuilding className="text-blue-500 text-lg" />
              <div>
                <p className="text-gray-700">Nuevo proveedor registrado</p>
                <p className="text-gray-500 text-xs">
                  Tecnología XYZ - Hace 1 día
                </p>
              </div>
            </li>
          </ul>
        </Card>

        <Card
          title="Proveedores Destacados"
          subtitle="Mejor desempeño este mes"
        >
          <ul className="space-y-4 mt-2">
            <li className="flex justify-between items-center">
              <div>
                <p className="font-semibold">
                  {loading ? (
                    <Spinner />
                  ) : (
                    proveedores[0]?.razon_social ||
                    "Suministros Industriales SA"
                  )}
                </p>
                <p className="text-gray-500 text-xs">15 órdenes completadas</p>
              </div>
              <div className="bg-green-100 px-2 py-1 rounded-lg">
                <p className="text-xs text-green-900 font-medium">
                  98% puntualidad
                </p>
              </div>
            </li>

            <li className="flex justify-between items-center">
              <div>
                <p className="font-semibold">
                  {loading ? (
                    <Spinner />
                  ) : (
                    proveedores[1]?.razon_social || "Materiales Premium Ltda"
                  )}
                </p>
                <p className="text-gray-500 text-xs">8 órdenes completadas</p>
              </div>
              <div className="bg-blue-100 px-2 py-1 rounded-lg">
                <p className="text-xs text-blue-900 font-medium">
                  100% calidad
                </p>
              </div>
            </li>

            <li className="flex justify-between items-center">
              <div>
                <p className="font-semibold">
                  {loading ? (
                    <Spinner />
                  ) : (
                    proveedores[2]?.razon_social || "Logística Express"
                  )}
                </p>
                <p className="text-gray-500 text-xs">22 entregas realizadas</p>
              </div>
              <div className="bg-purple-100 px-2 py-1 rounded-lg">
                <p className="text-xs text-purple-900 font-medium">
                  Mejor precio
                </p>
              </div>
            </li>
          </ul>
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
              {showForm ? "Cerrar Registro" : "Registrar Nuevo Proveedor"}
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
              showForm ? "max-h-[500px] mt-6" : "max-h-0"
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
                <XAxis dataKey="dia" tick={{ fill: "#6b7280" }} />
                <YAxis tick={{ fill: "#6b7280" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#f9fafb",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
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
  );
}
