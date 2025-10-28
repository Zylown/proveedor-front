import { useEffect, useState } from "react";
import { LuBuilding } from "react-icons/lu";
import {
  AiOutlineShoppingCart,
  AiOutlineTruck,
  AiOutlineWarning,
  AiOutlineCheckCircle,
  AiOutlineClockCircle,
} from "react-icons/ai";
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

  useEffect(() => {
    async function init() {
      try {
        const res = await fetch("https://proveedor-back-a1051c0b9289.herokuapp.com/dashboard/kpis");
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

  const SmallSpinner = () => (
    <div className="flex justify-center">
      <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="flex flex-col gap-6 p-4">
      <header className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card
          title="Total Proveedores"
          value="247"
          icon={<LuBuilding />}
          footer="+12% desde el mes pasado"
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
        />

        <Card
          title="Pagos Pendientes"
          //@ts-ignore
          value={
            loading ? (
              <SmallSpinner />
            ) : (
              `$${data?.pagos_pendientes || "0.00"}`
            )
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
                <p className="font-semibold">Suministros Industriales SA</p>
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
                <p className="font-semibold">Materiales Premium Ltda</p>
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
                <p className="font-semibold">Logística Express</p>
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

      <section>
        <Card title="Acciones Rápidas" subtitle="Tareas comunes del sistema">
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 mt-4">
            <button className="bg-azulbrillante text-white px-4 py-2 font-semibold rounded-lg hover:bg-blue-600 transition">
              Registrar Nuevo Proveedor
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
        </Card>
      </section>

      <section>
        <Card title="Análisis de Órdenes de Compra">
          <div className="h-64 flex items-center justify-center text-gray-400 text-sm sm:text-base">
            [Gráfico de Órdenes de Compra - Placeholder]
          </div>
        </Card>
      </section>
    </div>
  );
}
