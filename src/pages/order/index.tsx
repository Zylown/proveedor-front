import { LuFileText, LuShoppingCart, LuTrendingUp } from "react-icons/lu";
import Card from "../../components/Card";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

type OrdenCompra = {
  proveedor: string;
  fecha: string;
  monto: number;
  estado: string;
  descripcion: string;
};

export default function Order() {
  const { register, handleSubmit } = useForm<OrdenCompra>();

  const onSubmit = (data: OrdenCompra) => {
    toast.success("Orden registrada con éxito");
    console.log(data);
  };

  return (
    <section>
      <div className="top flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold">Órdenes de Compra</h2>
          <p className="text-grisoscuro">
            Gestiona y registra tus órdenes de compra
          </p>
        </div>
        <div>
          <button className="cursor-pointer bg-green-500 text-white px-3 py-2 gap-2 font-medium text-base rounded-md flex items-center hover:bg-green-600 transition">
            <LuShoppingCart className="text-xl text-white inline mr-2" />
            Nueva Orden
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card
          title="Registrar Orden"
          subtitle="Completa la información de la nueva orden"
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-4 flex flex-col gap-4"
          >
            <div>
              <label className="block">Proveedor</label>
              <input
                className="border border-gray-300 rounded-md p-2 w-full"
                placeholder="Ej. Suministros ABC"
                {...register("proveedor")}
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
                  placeholder="Ej. 1500"
                  {...register("monto")}
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
                <option value="Pendiente">Pendiente</option>
                <option value="Completada">Completada</option>
                <option value="Cancelada">Cancelada</option>
              </select>
            </div>
            <div>
              <label className="block">Descripción</label>
              <textarea
                className="border border-gray-300 rounded-md p-2 w-full"
                placeholder="Detalles de la orden"
                {...register("descripcion")}
              />
            </div>
            <div className="flex mt-4">
              <button
                type="submit"
                className="bg-green-500 text-white w-full font-semibold px-4 py-2 rounded-md hover:bg-green-600 transition"
              >
                Registrar Orden
              </button>
              <Toaster position="top-right" reverseOrder={false} />
            </div>
          </form>
        </Card>

        <Card
          title="Órdenes Registradas"
          subtitle="Lista de órdenes de compra activas"
        >
          <div className="mt-4 grid grid-cols-1 gap-4 max-h-96 overflow-y-auto">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gray-100/60 p-4 rounded-lg shadow">
              <div className="flex-shrink-0 text-gray-400 text-3xl mr-4">
                <LuFileText />
              </div>
              <div className="flex flex-col flex-grow">
                <p className="font-semibold">Proveedor: Suministros ABC</p>
                <p className="text-sm text-gray-500">Monto: $1,500</p>
              </div>
              <div className="flex flex-col items-start sm:items-end text-sm mt-2 sm:mt-0">
                <p className="text-yellow-600 font-medium">Pendiente</p>
                <p className="text-xs text-gray-500">Fecha: 2025-09-30</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gray-100/60 p-4 rounded-lg shadow">
              <div className="flex-shrink-0 text-gray-400 text-3xl mr-4">
                <LuFileText />
              </div>
              <div className="flex flex-col flex-grow">
                <p className="font-semibold">Proveedor: Logística Express</p>
                <p className="text-sm text-gray-500">Monto: $3,200</p>
              </div>
              <div className="flex flex-col items-start sm:items-end text-sm mt-2 sm:mt-0">
                <p className="text-green-600 font-medium">Completada</p>
                <p className="text-xs text-gray-500">Fecha: 2025-09-20</p>
              </div>
            </div>
          </div>
        </Card>

        <Card
          title="Resumen de Órdenes"
          subtitle="Estado general de las órdenes"
        >
          <div className="mt-4 flex flex-col gap-4">
            <div className="flex items-center justify-between p-3 bg-green-100 rounded-md">
              <span className="font-medium text-green-700">Completadas</span>
              <span className="font-bold text-green-700">12</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-100 rounded-md">
              <span className="font-medium text-yellow-700">Pendientes</span>
              <span className="font-bold text-yellow-700">5</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-red-100 rounded-md">
              <span className="font-medium text-red-700">Canceladas</span>
              <span className="font-bold text-red-700">2</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-100 rounded-md">
              <LuTrendingUp className="text-blue-500 text-xl" />
              <span className="text-blue-700 text-sm">
                20% más órdenes este mes
              </span>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
