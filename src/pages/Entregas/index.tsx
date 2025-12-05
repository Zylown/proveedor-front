import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LuPackage, LuEye, LuPencil } from "react-icons/lu";
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
  Cell,
} from "recharts";
import { Spinner } from "../../components/Spinner";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

// -------------------------------------------------------
//  ZOD SCHEMA
// -------------------------------------------------------
const entregaSchema = z.object({
  cliente: z.string().min(1, "El cliente es obligatorio"),
  direccion: z.string().min(1, "La dirección es obligatoria"),
  fechaEntrega: z.string().min(1, "La fecha de entrega es obligatoria"),
  transportista: z.string().min(1, "El transportista es obligatorio"),
  estado: z.string().min(1, "Debes seleccionar un estado"),
  notas: z.string().optional(),
});

type Entrega = z.infer<typeof entregaSchema>;

type EntregaBackend = {
  numero_guia: string;
  proveedor: string;
  direccion: string;
  transportista: string | null;
  estado: string;
  fecha: string | null;
  numero_orden: string;
};

type ResumenBackend = {
  entregadas: number;
  en_transito: number;
  retrasadas: number;
  canceladas: number;
};

export default function SeguimientoEntregas() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Entrega>({
    resolver: zodResolver(entregaSchema),
  });

  const [entregas, setEntregas] = useState<EntregaBackend[] | null>(null);
  const [resumen, setResumen] = useState<ResumenBackend | null>(null);
  const [loading, setLoading] = useState(true);

  const [proveedores, setProveedores] = useState<any[]>([]);

  // -------------------------------------------------------
  //  ENVIAR FORMULARIO
  // -------------------------------------------------------
  const onSubmit = async (data: Entrega) => {
    try {
      const payload = {
        numero_guia: data.cliente,
        cantidad_recibida: 1,
        observaciones: data.notas || null,
        fecha_entrega: data.fechaEntrega,
        estado: data.estado,
        id_orden: 1,
      };

      const res = await fetch(
        "https://proveedor-back-a1051c0b9289.herokuapp.com/entrega",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            accept: "*/*",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) throw new Error("Error al registrar");

      toast.success("Entrega registrada correctamente");
    } catch (err) {
      console.error(err);
      toast.error("Error al registrar la entrega");
    }
  };

  // -------------------------------------------------------
  //  CARGAR ENTREGAS
  // -------------------------------------------------------
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const resEntregas = await fetch(
          "https://proveedor-back-a1051c0b9289.herokuapp.com/entrega"
        );
        const dataEntregas: EntregaBackend[] = await resEntregas.json();

        const resResumen = await fetch(
          "https://proveedor-back-a1051c0b9289.herokuapp.com/entrega/resumen"
        );
        const dataResumen: ResumenBackend = await resResumen.json();

        setEntregas(dataEntregas);
        setResumen(dataResumen);
      } catch (error) {
        toast.error("Error al cargar datos");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // -------------------------------------------------------
  //  CARGAR PROVEEDORES
  // -------------------------------------------------------
  useEffect(() => {
    fetch("https://proveedor-back-a1051c0b9289.herokuapp.com/proveedor")
      .then((r) => r.json())
      .then((data) => setProveedores(data.items || []));
  }, []);

  // Autocompletar datos al seleccionar proveedor
  const handleSelectProveedor = (id: string) => {
    const prov = proveedores.find((p) => p.id_proveedor == id);
    if (!prov) return;

    setValue("cliente", prov.razon_social || "");
    setValue("direccion", prov.direccion || "");
    setValue("transportista", prov.contacto_principal || "");
  };

  const resumenEntregas = resumen
    ? [
        {
          estado: "Entregadas",
          cantidad: resumen.entregadas,
          color: "#22c55e",
        },
        {
          estado: "En tránsito",
          cantidad: resumen.en_transito,
          color: "#3b82f6",
        },
        {
          estado: "Retrasadas",
          cantidad: resumen.retrasadas,
          color: "#eab308",
        },
        {
          estado: "Canceladas",
          cantidad: resumen.canceladas,
          color: "#ef4444",
        },
      ]
    : [];

  // -------------------------------------------------------
  //  UI
  // -------------------------------------------------------
  return (
    <section>
      <div className="top flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold">Seguimiento de Entregas</h2>
          <p className="text-grisoscuro">
            Monitorea el estado y progreso de todas las entregas
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* REGISTRAR ENTREGA */}
        <Card
          title="Registrar Entrega"
          subtitle="Completa los datos de la entrega"
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-4 flex flex-col gap-4"
          >
            {/* SELECT DE PROVEEDOR */}
            <div>
              <label className="block font-medium">Proveedor</label>
              <select
                className="border border-gray-300 rounded-md p-2 w-full"
                onChange={(e) => handleSelectProveedor(e.target.value)}
              >
                <option value="">Seleccione proveedor...</option>
                {proveedores.map((p) => (
                  <option key={p.id_proveedor} value={p.id_proveedor}>
                    {p.razon_social}
                  </option>
                ))}
              </select>
            </div>

            {/* CLIENTE */}
            <div>
              <label className="block">Cliente</label>
              <input
                className="border border-gray-300 rounded-md p-2 w-full"
                {...register("cliente")}
              />
              {errors.cliente && (
                <p className="text-red-500 text-sm">{errors.cliente.message}</p>
              )}
            </div>

            {/* DIRECCIÓN */}
            <div>
              <label className="block">Dirección</label>
              <input
                className="border border-gray-300 rounded-md p-2 w-full"
                {...register("direccion")}
              />
              {errors.direccion && (
                <p className="text-red-500 text-sm">
                  {errors.direccion.message}
                </p>
              )}
            </div>

            {/* FECHA + TRANSPORTISTA */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              <div>
                <label className="block">Fecha de Entrega</label>
                <input
                  type="date"
                  className="border border-gray-300 rounded-md p-2 w-full"
                  {...register("fechaEntrega")}
                />
                {errors.fechaEntrega && (
                  <p className="text-red-500 text-sm">
                    {errors.fechaEntrega.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block">Transportista</label>
                <input
                  className="border border-gray-300 rounded-md p-2 w-full"
                  {...register("transportista")}
                />
                {errors.transportista && (
                  <p className="text-red-500 text-sm">
                    {errors.transportista.message}
                  </p>
                )}
              </div>
            </div>

            {/* ESTADO */}
            <div>
              <label className="block">Estado</label>
              <select
                className="border border-gray-300 rounded-md p-2 w-full"
                {...register("estado")}
              >
                <option value="">Seleccione estado</option>
                <option value="pendiente">En tránsito</option>
                <option value="completada">Entregado</option>
                <option value="pendiente">Retrasado</option>
                <option value="cancelada">Cancelado</option>
              </select>

              {errors.estado && (
                <p className="text-red-500 text-sm">{errors.estado.message}</p>
              )}
            </div>

            {/* NOTAS */}
            <div>
              <label className="block">Notas</label>
              <textarea
                className="border border-gray-300 rounded-md p-2 w-full"
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

        {/* LISTA DE ENTREGAS */}
        <Card title="Entregas Registradas" subtitle="Historial y estado actual">
          <SimpleBar style={{ maxHeight: 384 }} autoHide={false}>
            {loading ? (
              <div className="flex justify-center py-10">
                <Spinner />
              </div>
            ) : (
              entregas?.map((entrega, i) => (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gray-100/60 p-4 rounded-lg shadow"
                >
                  <div className="flex-shrink-0 text-gray-400 text-3xl mr-4">
                    <LuPackage />
                  </div>

                  <div className="flex flex-col flex-grow">
                    <p className="font-semibold">
                      {entrega.numero_guia} - {entrega.proveedor}
                    </p>
                    <p className="text-sm text-gray-500">{entrega.direccion}</p>
                    <p className="text-xs text-gray-400">
                      Transportista: {entrega.transportista || "-"}
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
                      Fecha: {entrega.fecha || "-"}
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
              ))
            )}
          </SimpleBar>
        </Card>

        {/* RESUMEN */}
        <Card title="Resumen de Entregas" subtitle="Estado general de entregas">
          {loading ? (
            <div className="flex justify-center py-10">
              <Spinner />
            </div>
          ) : (
            <>
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

              <div className="mt-6 w-full h-56">
                <ResponsiveContainer>
                  <BarChart data={resumenEntregas}>
                    <XAxis dataKey="estado" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="cantidad">
                      {resumenEntregas.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </>
          )}
        </Card>
      </div>
    </section>
  );
}
