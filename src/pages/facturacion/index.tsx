import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import {
  LuCreditCard,
  LuFileText,
  LuWallet,
  LuDownload,
  LuEye,
  LuPencil,
} from "react-icons/lu";
import Card from "../../components/Card";
import toast, { Toaster } from "react-hot-toast";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
} from "recharts";

type Factura = {
  cliente: string;
  numeroFactura: string;
  fecha: string;
  monto: number;
  metodoPago: string;
  estado: string;
  notas: string;
  ruc?: string;
  direccion?: string;
  telefono?: string;
  email?: string;
};

type Proveedor = {
  id_proveedor: number;
  ruc: string;
  razon_social: string;
  direccion: string;
  telefono: string;
  email: string;
};

export default function Facturacion() {
  const { register, handleSubmit, setValue } = useForm<Factura>();
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);

  useEffect(() => {
    fetch("https://proveedor-back-a1051c0b9289.herokuapp.com/proveedor")
      .then((res) => res.json())
      .then((data) => setProveedores(data.items))
      .catch((err) => console.error("Error cargando proveedores:", err));
  }, []);

  const onSelectCliente = (id: string) => {
    const proveedor = proveedores.find((p) => p.id_proveedor === Number(id));
    if (!proveedor) return;
    setValue("cliente", proveedor.razon_social);
    setValue("ruc", proveedor.ruc);
    setValue("direccion", proveedor.direccion);
    setValue("telefono", proveedor.telefono);
    setValue("email", proveedor.email);
  };

  const onSubmit = (data: Factura) => {
    toast.success("Factura/Pago registrado con éxito ✅");
    console.log(data);
  };

  /*const [resumenPagos, setResumenPagos] = useState([
    { name: "Pagadas", value: 0, color: "#22c55e" },
    { name: "Pendientes", value: 0, color: "#eab308" },
    { name: "Vencidas", value: 0, color: "#ef4444" },
  ]);

  useEffect(() => {
    fetch("https://proveedor-back-a1051c0b9289.herokuapp.com/dashboard/kpis")
      .then((res) => res.json())
      .then((data) => {
        const pendientes = data.pagos_pendientes
          ? Number(data.pagos_pendientes)
          : 0;
        const vencidas = data.facturas_vencidas ?? 0;
        const pagadas = Math.max(0, data.ordenes_activas - vencidas); // falta agregar ese response en el backend xd
        setResumenPagos([
          { name: "Pagadas", value: pagadas, color: "#22c55e" },
          { name: "Pendientes", value: pendientes, color: "#eab308" },
          { name: "Vencidas", value: vencidas, color: "#ef4444" },
        ]);
      })
      .catch(() => console.log("Error cargando KPIs"));
  }, []);*/

  const resumenPagos = [
    { name: "Pagadas", value: 15, color: "#22c55e" },
    { name: "Pendientes", value: 7, color: "#eab308" },
    { name: "Vencidas", value: 3, color: "#ef4444" },
  ];

  const ingresosMensuales = [
    { mes: "Ene", monto: 12000 },
    { mes: "Feb", monto: 15000 },
    { mes: "Mar", monto: 9000 },
    { mes: "Abr", monto: 18000 },
    { mes: "May", monto: 21000 },
    { mes: "Jun", monto: 16500 },
  ];

  return (
    <section>
      <div className="top flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold">Facturación y Pagos</h2>
          <p className="text-grisoscuro">
            Administra facturas emitidas, pagos registrados y estados de cobro
          </p>
        </div>
        <div>
          <button className="cursor-pointer bg-purple-500 text-white px-3 py-2 gap-2 font-medium text-base rounded-md flex items-center hover:bg-purple-600 transition">
            <LuCreditCard className="text-xl text-white inline mr-2" />
            Nueva Factura
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card
          title="Registrar Factura"
          subtitle="Completa los datos de facturación"
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-4 flex flex-col gap-4"
          >
            <div>
              <label className="block font-semibold">Cliente</label>
              <select
                className="border border-gray-300 rounded-md p-2 w-full"
                onChange={(e) => onSelectCliente(e.target.value)}
              >
                <option value="">Seleccione cliente</option>
                {proveedores.map((prov) => (
                  <option key={prov.id_proveedor} value={prov.id_proveedor}>
                    {prov.razon_social}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block">Número de Factura</label>
              <input
                className="border border-gray-300 rounded-md p-2 w-full"
                placeholder="FAC-00123"
                {...register("numeroFactura")}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              <div>
                <label className="block">Fecha</label>
                <input
                  type="date"
                  className="border border-gray-300 rounded-md p-2 w-full"
                  {...register("fecha")}
                />
              </div>
              <div>
                <label className="block">Monto</label>
                <input
                  type="number"
                  className="border border-gray-300 rounded-md p-2 w-full"
                  placeholder="Ej. 2500"
                  {...register("monto")}
                />
              </div>
            </div>
            <div>
              <label className="block">Método de Pago</label>
              <select
                className="border border-gray-300 rounded-md p-2 w-full"
                {...register("metodoPago")}
              >
                <option value="">Seleccione método</option>
                <option value="Transferencia">Transferencia</option>
                <option value="Tarjeta">Tarjeta de Crédito</option>
                <option value="Efectivo">Efectivo</option>
              </select>
            </div>
            <div>
              <label className="block">Estado</label>
              <select
                className="border border-gray-300 rounded-md p-2 w-full"
                {...register("estado")}
              >
                <option value="">Seleccione estado</option>
                <option value="Pagado">Pagado</option>
                <option value="Pendiente">Pendiente</option>
                <option value="Vencido">Vencido</option>
              </select>
            </div>
            <div>
              <label className="block">Notas / Observaciones</label>
              <textarea
                className="border border-gray-300 rounded-md p-2 w-full"
                placeholder="Detalles adicionales sobre el pago..."
                {...register("notas")}
              />
            </div>
            <div className="flex mt-4">
              <button
                type="submit"
                className="bg-purple-500 text-white w-full font-semibold px-4 py-2 rounded-md hover:bg-purple-600 transition"
              >
                Registrar Factura
              </button>
              <Toaster position="top-right" reverseOrder={false} />
            </div>
          </form>
        </Card>

        <Card title="Facturas Registradas" subtitle="Historial de facturación">
          <div className="mt-4 grid grid-cols-1 gap-4 max-h-96 overflow-y-auto">
            {[
              {
                id: "FAC-00123",
                cliente: "Empresa XYZ",
                monto: 2500,
                estado: "Pagado",
                fecha: "2025-09-20",
              },
              {
                id: "FAC-00124",
                cliente: "Logística Express",
                monto: 1200,
                estado: "Pendiente",
                fecha: "2025-09-25",
              },
              {
                id: "FAC-00125",
                cliente: "Materiales Premium",
                monto: 3800,
                estado: "Vencido",
                fecha: "2025-09-15",
              },
            ].map((factura, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gray-100/60 p-4 rounded-lg shadow"
              >
                <div className="flex-shrink-0 text-gray-400 text-3xl mr-4">
                  <LuFileText />
                </div>
                <div className="flex flex-col flex-grow">
                  <p className="font-semibold">
                    {factura.id} - {factura.cliente}
                  </p>
                  <p className="text-sm text-gray-500">
                    Monto: ${factura.monto}
                  </p>
                </div>
                <div className="flex flex-col items-start sm:items-end text-sm mt-2 sm:mt-0">
                  <p
                    className={`font-medium ${
                      factura.estado === "Pagado"
                        ? "text-green-600"
                        : factura.estado === "Pendiente"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {factura.estado}
                  </p>
                  <p className="text-xs text-gray-500">
                    Fecha: {factura.fecha}
                  </p>
                  <div className="flex gap-2 mt-2">
                    <button className="p-2 rounded-md bg-blue-100 hover:bg-blue-200">
                      <LuEye className="text-blue-600" />
                    </button>
                    <button className="p-2 rounded-md bg-yellow-100 hover:bg-yellow-200">
                      <LuPencil className="text-yellow-600" />
                    </button>
                    <button className="p-2 rounded-md bg-green-100 hover:bg-green-200">
                      <LuDownload className="text-green-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Resumen Financiero" subtitle="Estado general de pagos">
          <div className="mt-4 flex flex-col gap-4">
            <div className="flex items-center justify-between p-3 bg-green-100 rounded-md">
              <span className="font-medium text-green-700">Pagadas</span>
              <span className="font-bold text-green-700">15</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-100 rounded-md">
              <span className="font-medium text-yellow-700">Pendientes</span>
              <span className="font-bold text-yellow-700">7</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-red-100 rounded-md">
              <span className="font-medium text-red-700">Vencidas</span>
              <span className="font-bold text-red-700">3</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-100 rounded-md">
              <LuWallet className="text-purple-500 text-xl" />
              <span className="text-purple-700 text-sm">
                Total ingresado: $21,500
              </span>
            </div>
          </div>

          <div className="mt-6 w-full h-56">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={resumenPagos} dataKey="value" outerRadius={80} label>
                  {resumenPagos.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card title="Ingresos Mensuales" subtitle="Seguimiento de ingresos">
        <div className="w-full h-80">
          <ResponsiveContainer>
            <BarChart data={ingresosMensuales}>
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="monto" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </section>
  );
}
