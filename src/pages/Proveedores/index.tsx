import { useEffect, useState } from "react";
import Card from "../../components/Card";
import { useForm } from "react-hook-form";
import type { Proveedor } from "../../types/Proveedores.types";
import toast, { Toaster } from "react-hot-toast";
import { LuBuilding } from "react-icons/lu";
import {
  AiOutlinePhone,
  AiOutlineMail,
  AiOutlineUser,
  AiFillStar,
} from "react-icons/ai";

const tiempoRelativo = (fecha: string) => {
  const ahora = new Date();
  const creacion = new Date(fecha);
  const diffMs = ahora.getTime() - creacion.getTime();
  const diffDias = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDias === 0) return "Hoy";
  if (diffDias === 1) return "Hace 1 día";
  if (diffDias < 7) return `Hace ${diffDias} días`;
  if (diffDias < 30)
    return `Hace ${Math.floor(diffDias / 7)} semana${
      Math.floor(diffDias / 7) > 1 ? "s" : ""
    }`;
  return `Hace ${Math.floor(diffDias / 30)} mes${
    Math.floor(diffDias / 30) > 1 ? "es" : ""
  }`;
};

export default function Proveedores() {
  const { register, handleSubmit } = useForm<Proveedor>();
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [loading, setLoading] = useState(true);

  const onSubmit = (data: Proveedor) => {
    toast.success("Proveedor registrado con éxito");
    console.log(data);
  };

  const Spinner = () => (
    <div className="flex justify-center py-6">
      <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  useEffect(() => {
    const fetchProveedores = async () => {
      try {
        const res = await fetch(
          "https://proveedor-back-a1051c0b9289.herokuapp.com/proveedor"
        );
        const data = await res.json();
        setProveedores(data);
      } catch (err) {
        console.error("Error al cargar proveedores:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProveedores();
  }, []);

  return (
    <section>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold">Registro de Proveedores</h2>
          <p className="text-gray-600">
            Gestiona la información de tus proveedores
          </p>
        </div>
        <div>
          <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
            <LuBuilding className="text-xl" /> Nuevo Proveedor
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* FORMULARIO */}
        <Card
          title="Información del Proveedor"
          subtitle="Completa los datos básicos del proveedor"
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-4 flex flex-col gap-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Nombre Comercial
                </label>
                <input
                  className="border border-gray-300 rounded-md p-2 w-full"
                  placeholder="Ej. Suministros ABC"
                  {...register("nombreComercial")}
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Razón Social
                </label>
                <input
                  className="border border-gray-300 rounded-md p-2 w-full"
                  placeholder="Ej. Suministros ABC SAC"
                  {...register("razonSocial")}
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                RUC
              </label>
              <input
                className="border border-gray-300 rounded-md p-2 w-full"
                placeholder="Ej. 12345678901"
                {...register("ruc")}
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Dirección
              </label>
              <input
                className="border border-gray-300 rounded-md p-2 w-full"
                placeholder="Ej. Av. Siempre Viva 123"
                {...register("direccion")}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Teléfono
                </label>
                <input
                  className="border border-gray-300 rounded-md p-2 w-full"
                  placeholder="987654321"
                  {...register("telefono")}
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Email
                </label>
                <input
                  className="border border-gray-300 rounded-md p-2 w-full"
                  placeholder="contacto@proveedor.com"
                  {...register("email")}
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Tipo de Proveedor
              </label>
              <select
                className="border border-gray-300 rounded-md p-2 w-full"
                {...register("tipoProveedor")}
              >
                <option value="">Seleccione un tipo</option>
                <option value="Nacional">Nacional</option>
                <option value="Internacional">Internacional</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Descripción
              </label>
              <textarea
                className="border border-gray-300 rounded-md p-2 w-full"
                placeholder="Información adicional sobre el proveedor"
                {...register("descripcion")}
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white w-full py-2 rounded-md mt-2 hover:bg-blue-600 transition font-medium"
            >
              Registrar Proveedor
            </button>
            <Toaster position="top-right" />
          </form>
        </Card>

        {/* PROVEEDORES REGISTRADOS */}
        <Card
          title="Proveedores Registrados"
          subtitle="Lista de proveedores activos en el sistema"
        >
          {loading ? (
            <Spinner />
          ) : (
            <ul className="space-y-4 mt-4 max-h-[32rem] overflow-y-auto">
              {proveedores.map((p: any) => (
                <li
                  key={p.id_proveedor}
                  className="relative bg-white rounded-xl shadow-md hover:shadow-lg transition border border-gray-200 p-4 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4"
                >
                  <div className="flex items-start gap-3 sm:flex-1">
                    <LuBuilding className="text-gray-400 text-3xl mt-1" />
                    <div className="flex flex-col gap-1">
                      <p className="font-bold text-gray-900 text-lg">
                        {p.razon_social}
                      </p>
                      <p className="text-gray-600 text-sm">RUC: {p.ruc}</p>
                      <p className="text-gray-600 text-sm truncate max-w-xs">
                        {p.direccion}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1 sm:text-right sm:min-w-[180px]">
                    <p className="text-gray-800 flex items-center gap-1">
                      <AiOutlinePhone className="w-4 h-4 text-gray-500" />{" "}
                      {p.telefono}
                    </p>
                    <p className="text-gray-800 flex items-center gap-1">
                      <AiOutlineMail className="w-4 h-4 text-gray-500" />{" "}
                      {p.email}
                    </p>
                    <p className="text-gray-800 flex items-center gap-1">
                      <AiOutlineUser className="w-4 h-4 text-gray-500" />{" "}
                      {p.contacto_principal}
                    </p>
                  </div>

                  <div className="flex flex-col items-start sm:items-end gap-1 mt-2 sm:mt-0">
                    <span
                      className={`px-2 py-1 rounded-md text-sm font-semibold ${
                        p.estado === "activo"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {p.estado.toUpperCase()}
                    </span>
                    <p className="text-gray-400 text-xs">
                      {tiempoRelativo(p.fecha_creacion)}
                    </p>

                    <div className="flex items-center gap-1 text-yellow-500 font-semibold mt-1">
                      <AiFillStar className="w-4 h-4" />{" "}
                      {p.calificacion_promedio || "N/A"}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </section>
  );
}
