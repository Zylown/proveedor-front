import { LuBuilding } from "react-icons/lu";
import Card from "../../components/Card";
import { useForm } from "react-hook-form";
import type { Proveedor } from "../../types/Proveedores.types";
import toast, { Toaster } from "react-hot-toast";

export default function Proveedores() {
  const { register, handleSubmit } = useForm<Proveedor>();

  const onSubmit = (data: Proveedor) => {
    toast.success("Proveedor registrado con éxito");
    console.log(data);
  };
  return (
    <section>
      <div className="top flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold">Registro de Proveedores</h2>
          <p className="text-grisoscuro">
            Gestiona la información de tus proveedores
          </p>
        </div>
        <div>
          <button className="cursor-pointer bg-blue-400 text-white px-3 py-2 gap-2 font-medium text-base rounded-md flex items-center hover:bg-blue-600 transition">
            <LuBuilding className="text-xl text-white inline mr-2" />
            Nuevo Proveedor
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6 mb-8">
        <Card
          title="Información del Proveedor"
          subtitle="Completa los datos básicos del proveedor"
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-4 flex flex-col gap-4"
          >
            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="form_izq w-full">
                <label className="block">Nombre Comercial</label>
                <input
                  className="border border-gray-300 rounded-md p-2 w-full"
                  placeholder="Ej. Suministros ABC"
                  {...register("nombreComercial")}
                />
              </div>
              <div className="form_der w-full">
                <label className="block">Razón Social</label>
                <input
                  className="border border-gray-300 rounded-md p-2 w-full"
                  placeholder="Ej. Suministros ABC"
                  {...register("nombreComercial")}
                />
              </div>
            </div>
            <div>
              <label className="block">RUC</label>
              <input
                className="border border-gray-300 rounded-md p-2 w-full"
                placeholder="Ej. 12345678901"
                {...register("ruc")}
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
            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="form_izq w-full">
                <label className="block">Teléfono</label>
                <input
                  className="border border-gray-300 rounded-md p-2 w-full"
                  placeholder="Ej. 987654321"
                  {...register("telefono")}
                />
              </div>
              <div>
                <label className="block">Email</label>
                <input
                  className="border border-gray-300 rounded-md p-2 w-full"
                  placeholder="contacto@proveedor.com"
                  {...register("email")}
                />
              </div>
            </div>
            <div>
              <label className="block">Tipo de Proveedor</label>
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
              <label className="block">Descripción</label>
              <textarea
                className="border border-gray-300 rounded-md p-2 w-full"
                placeholder="Información adicional sobre el proveedor"
                {...register("descripcion")}
              />
            </div>
            <div className="flex mt-4">
              <button
                type="submit"
                className="bg-blue-500 text-white w-full font-semibold px-4 py-2 rounded-md hover:bg-blue-600 transition"
              >
                Registrar Proveedor
              </button>
              <Toaster position="top-right" reverseOrder={false} />
            </div>
          </form>
        </Card>
        <Card
          title="Proveedores Registrados"
          subtitle="Lista de proveedores activos en el sistema"
        >
          <div className="mt-4 grid grid-cols-1 gap-4 max-h-96">
            {/* Tarjeta de proveedor */}
            <div className="flex items-center justify-between bg-gray-100/60 p-4 rounded-lg shadow">
              {/* Icono izquierda */}
              <div className="flex-shrink-0 text-gray-400 text-3xl mr-4">
                <LuBuilding />
              </div>

              {/* Centro: Nombre y RUC */}
              <div className="flex flex-col items-start text-center flex-grow">
                <p className="font-semibold">Suministros Industriales SA</p>
                <p className="text-sm text-gray-500">RUC: 12345678901</p>
              </div>

              {/* Derecha: Info */}
              <div className="flex flex-col items-end text-sm">
                <p>Insumos</p>
                <p className="text-blue-600 font-medium">Activo</p>
              </div>
            </div>

            {/* Puedes duplicar y cambiar los datos para más proveedores */}
            <div className="flex items-center justify-between bg-gray-100/60 p-4 rounded-lg shadow">
              {/* Icono izquierda */}
              <div className="flex-shrink-0 text-gray-400 text-3xl mr-4">
                <LuBuilding />
              </div>

              {/* Centro: Nombre y RUC */}
              <div className="flex flex-col items-start text-center flex-grow">
                <p className="font-semibold">Logística Express</p>
                <p className="text-sm text-gray-500">RUC: 20987654321</p>
              </div>

              {/* Derecha: Info */}
              <div className="flex flex-col items-end text-sm">
                <p className="text-blue-600 font-medium">Servicios</p>
                <p className="text-blue-600 font-medium">Activo</p>
              </div>
            </div>
            <div className="flex items-center justify-between bg-gray-100/60 p-4 rounded-lg shadow">
              {/* Icono izquierda */}
              <div className="flex-shrink-0 text-gray-400 text-3xl mr-4">
                <LuBuilding />
              </div>

              {/* Centro: Nombre y RUC */}
              <div className="flex flex-col items-start text-center flex-grow">
                <p className="font-semibold">Materiales Premium</p>
                <p className="text-sm text-gray-500">RUC: 20456789123</p>
              </div>

              {/* Derecha: Info */}
              <div className="flex flex-col items-end text-sm">
                <p>Insumos</p>
                <p className="text-blue-600 font-medium">Activo</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
