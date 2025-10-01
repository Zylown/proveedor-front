import { useForm } from "react-hook-form";
import {
  LuTruck,
  LuPackage,
  LuEye,
  LuPencil,
} from "react-icons/lu";
import Card from "../../components/Card";
import toast, { Toaster } from "react-hot-toast";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type Entrega = {
  cliente: string;
  direccion: string;
  fechaEntrega: string;
  transportista: string;
  estado: string;
  notas: string;
};

export default function SeguimientoEntregas() {
  const { register, handleSubmit } = useForm<Entrega>();

  const onSubmit = (data: Entrega) => {
    toast.success("Entrega registrada con éxito 🚚");
    console.log(data);
  };

  const resumenEntregas = [
    { estado: "Entregadas", cantidad: 12, color: "#22c55e" },
    { estado: "En tránsito", cantidad: 5, color: "#3b82f6" },
    { estado: "Retrasadas", cantidad: 2, color: "#eab308" },
    { estado: "Canceladas", cantidad: 1, color: "#ef4444" },
  ];

  const entregasEjemplo = [
    {
      id: "ENT-1001",
      cliente: "Empresa XYZ",
      direccion: "Av. Siempre Viva 742",
      fechaEntrega: "2025-09-28",
      transportista: "Transporte Perú",
      estado: "Entregado",
    },
    {
      id: "ENT-1002",
      cliente: "Logística Express",
      direccion: "Calle Los Laureles 123",
      fechaEntrega: "2025-09-29",
      transportista: "Courier Nacional",
      estado: "En tránsito",
    },
    {
      id: "ENT-1003",
      cliente: "Materiales Premium",
      direccion: "Jr. Comercio 456",
      fechaEntrega: "2025-09-25",
      transportista: "Transportes Andinos",
      estado: "Retrasado",
    },
  ];

  return (
    <section>
      {/* Header */}
      <div className="top flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold">Seguimiento de Entregas</h2>
          <p className="text-grisoscuro">
            Monitorea el estado y progreso de todas las entregas
          </p>
        </div>
        <div>
          <button className="cursor-pointer bg-green-500 text-white px-3 py-2 gap-2 font-medium text-base rounded-md flex items-center hover:bg-green-600 transition">
            <LuTruck className="text-xl text-white inline mr-2" />
            Nueva Entrega
          </button>
        </div>
      </div>

      {/* Layout principal */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Formulario de Entregas */}
        <Card title="Registrar Entrega" subtitle="Completa los datos de la entrega">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-4 flex flex-col gap-4"
          >
            <div>
              <label className="block">Cliente</label>
              <input
                className="border border-gray-300 rounded-md p-2 w-full"
                placeholder="Ej. Empresa XYZ"
                {...register("cliente")}
              />
            </div>
            <div>
              <label className="block">Dirección</label>
              <input
                className="border border-gray-300 rounded-md p-2 w-full"
                placeholder="Ej. Av. Siempre Viva 123"
                {...register("direccion")}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              <div>
                <label className="block">Fecha de Entrega</label>
                <input
                  type="date"
                  className="border border-gray-300 rounded-md p-2 w-full"
                  {...register("fechaEntrega")}
                />
              </div>
              <div>
                <label className="block">Transportista</label>
                <input
                  className="border border-gray-300 rounded-md p-2 w-full"
                  placeholder="Ej. Courier Nacional"
                  {...register("transportista")}
                />
              </div>
            </div>
            <div>
              <label className="block">Estado</label>
              <select
                className="border border-gray-300 rounded-md p-2 w-full"
                {...register("estado")}
              >
                <option value="">Seleccione estado</option>
                <option value="En tránsito">En tránsito</option>
                <option value="Entregado">Entregado</option>
                <option value="Retrasado">Retrasado</option>
                <option value="Cancelado">Cancelado</option>
              </select>
            </div>
            <div>
              <label className="block">Notas</label>
              <textarea
                className="border border-gray-300 rounded-md p-2 w-full"
                placeholder="Información adicional..."
                {...register("notas")}
              />
            </div>
            <div className="flex mt-4">
              <button
                type="submit"
                className="bg-green-500 text-white w-full font-semibold px-4 py-2 rounded-md hover:bg-green-600 transition"
              >
                Registrar Entrega
              </button>
              <Toaster position="top-right" reverseOrder={false} />
            </div>
          </form>
        </Card>

        {/* Lista de entregas */}
        <Card title="Entregas Registradas" subtitle="Historial y estado actual">
          <div className="mt-4 grid grid-cols-1 gap-4 max-h-96 overflow-y-auto">
            {entregasEjemplo.map((entrega, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gray-100/60 p-4 rounded-lg shadow"
              >
                <div className="flex-shrink-0 text-gray-400 text-3xl mr-4">
                  <LuPackage />
                </div>
                <div className="flex flex-col flex-grow">
                  <p className="font-semibold">
                    {entrega.id} - {entrega.cliente}
                  </p>
                  <p className="text-sm text-gray-500">
                    {entrega.direccion}
                  </p>
                  <p className="text-xs text-gray-400">
                    Transportista: {entrega.transportista}
                  </p>
                </div>
                <div className="flex flex-col items-start sm:items-end text-sm mt-2 sm:mt-0">
                  <p
                    className={`font-medium ${
                      entrega.estado === "Entregado"
                        ? "text-green-600"
                        : entrega.estado === "En tránsito"
                        ? "text-blue-600"
                        : entrega.estado === "Retrasado"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {entrega.estado}
                  </p>
                  <p className="text-xs text-gray-500">
                    Fecha: {entrega.fechaEntrega}
                  </p>
                  <div className="flex gap-2 mt-2">
                    <button className="p-2 rounded-md bg-blue-100 hover:bg-blue-200">
                      <LuEye className="text-blue-600" />
                    </button>
                    <button className="p-2 rounded-md bg-yellow-100 hover:bg-yellow-200">
                      <LuPencil className="text-yellow-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Resumen */}
        <Card title="Resumen de Entregas" subtitle="Estado general de entregas">
          <div className="mt-4 flex flex-col gap-3">
            {resumenEntregas.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-md"
                style={{ backgroundColor: item.color + "20" }}
              >
                <span className="font-medium" style={{ color: item.color }}>
                  {item.estado}
                </span>
                <span className="font-bold" style={{ color: item.color }}>
                  {item.cantidad}
                </span>
              </div>
            ))}
          </div>

          {/* Gráfico */}
          <div className="mt-6 w-full h-56">
            <ResponsiveContainer>
              <BarChart data={resumenEntregas}>
                <XAxis dataKey="estado" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="cantidad" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </section>
  );
}
