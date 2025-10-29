import { useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import Card from "../../components/Card";
import {
  LuStar,
  LuUsers,
  LuTrophy,
  LuInfo,
  LuCalendarDays,
  LuClipboardCheck,
  LuX,
} from "react-icons/lu";

/** ================= Tipos ================= */
type Criterios = {
  calidad: number; // 1-5
  entrega: number; // 1-5
  precio: number; // 1-5
  servicio: number; // 1-5
};

type EvaluacionProveedor = {
  id: string;
  proveedor: string;
  fecha: string; // ISO yyyy-mm-dd
  criterios: Criterios;
  comentario?: string;
  evaluador?: string;
  puntaje: number; // 0-5 calculado
};

type FormFields = {
  proveedor: string;
  fecha: string; // yyyy-mm-dd
  calidad: number;
  entrega: number;
  precio: number;
  servicio: number;
  comentario?: string;
  evaluador?: string;
};

/** ================= Utils ================= */
const PESOS = {
  calidad: 0.4,
  entrega: 0.3,
  precio: 0.2,
  servicio: 0.1,
};

const calcPuntaje = (c: Criterios) =>
  +(
    c.calidad * PESOS.calidad +
    c.entrega * PESOS.entrega +
    c.precio * PESOS.precio +
    c.servicio * PESOS.servicio
  ).toFixed(2);

const scoreToLabel = (puntaje: number) => {
  if (puntaje >= 4.5) return "Excelente";
  if (puntaje >= 4.0) return "Muy bueno";
  if (puntaje >= 3.0) return "Bueno";
  if (puntaje >= 2.0) return "Deficiente";
  return "Crítico";
};

const cls = (...xs: (string | false | null | undefined)[]) =>
  xs.filter(Boolean).join(" ");

const formatDate = (iso: string) =>
  new Date(iso + "T00:00:00").toLocaleDateString("es-PE", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

/** ================= Componentes base ================= */
function BadgePuntaje({ puntaje }: { puntaje: number }) {
  let tone = "bg-gray-100 text-gray-700";
  let label = "Regular";

  if (puntaje >= 4.5) {
    tone = "bg-green-100 text-green-700";
    label = "Excelente";
  } else if (puntaje >= 4) {
    tone = "bg-emerald-100 text-emerald-700";
    label = "Muy bueno";
  } else if (puntaje >= 3) {
    tone = "bg-yellow-100 text-yellow-700";
    label = "Bueno";
  } else if (puntaje >= 2) {
    tone = "bg-orange-100 text-orange-700";
    label = "Deficiente";
  } else {
    tone = "bg-red-100 text-red-700";
    label = "Crítico";
  }

  return (
    <span
      className={cls(
        "inline-flex items-center px-2 py-1 rounded text-xs font-semibold",
        tone
      )}
    >
      <LuClipboardCheck className="mr-1" />
      {label} ({puntaje.toFixed(2)})
    </span>
  );
}

/** Input de estrellas controlado y compacto para no desbordar */
function StarRating({
  value,
  onChange,
  readOnly = false,
  size = "md", // "sm" | "md" | "lg"
  className = "",
}: {
  value: number;
  onChange?: (v: number) => void;
  readOnly?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizeCls =
    size === "sm"
      ? "text-base"
      : size === "lg"
      ? "text-3xl"
      : "text-xl sm:text-2xl";

  return (
    <div
      className={cls(
        "flex items-center gap-1 leading-none min-w-0 overflow-hidden whitespace-nowrap",
        className
      )}
    >
      {[1, 2, 3, 4, 5].map((n) => {
        const active = n <= value;
        return (
          <button
            key={n}
            type="button"
            className={cls(
              "transition p-0 m-0 shrink-0",
              readOnly
                ? "cursor-default pointer-events-none"
                : "cursor-pointer",
              sizeCls,
              active ? "text-yellow-500" : "text-gray-300 hover:text-yellow-400"
            )}
            onClick={() => !readOnly && onChange?.(n)}
            aria-label={`Calificar con ${n} estrellas`}
          >
            <LuStar />
          </button>
        );
      })}
    </div>
  );
}

/** ================= Modal Detalle ================= */
function ModalDetalleEvaluacion({
  open,
  onClose,
  item,
}: {
  open: boolean;
  onClose: () => void;
  item: EvaluacionProveedor | null;
}) {
  if (!open || !item) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-xl">
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <h3 className="text-lg font-semibold">Detalle de evaluación</h3>
          <button
            className="p-1 rounded hover:bg-gray-100"
            onClick={onClose}
            aria-label="Cerrar"
          >
            <LuX className="text-xl" />
          </button>
        </div>

        <div className="px-5 py-4 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <div className="text-sm text-gray-500">Proveedor</div>
              <div className="font-semibold">{item.proveedor}</div>
            </div>
            <div className="text-sm text-gray-600 flex items-center gap-3">
              <span className="inline-flex items-center gap-1">
                <LuCalendarDays />
                {formatDate(item.fecha)}
              </span>
              {item.evaluador && (
                <span className="inline-flex items-center gap-1">
                  <LuUsers />
                  {item.evaluador}
                </span>
              )}
            </div>
          </div>

          {item.comentario && (
            <div className="bg-gray-50 rounded-md p-3 text-sm text-gray-700">
              {item.comentario}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 border rounded-md">
              <div className="text-sm font-medium mb-1">Calidad</div>
              <StarRating value={item.criterios.calidad} readOnly size="lg" />
            </div>
            <div className="p-3 border rounded-md">
              <div className="text-sm font-medium mb-1">Entrega</div>
              <StarRating value={item.criterios.entrega} readOnly size="lg" />
            </div>
            <div className="p-3 border rounded-md">
              <div className="text-sm font-medium mb-1">Precio</div>
              <StarRating value={item.criterios.precio} readOnly size="lg" />
            </div>
            <div className="p-3 border rounded-md">
              <div className="text-sm font-medium mb-1">Servicio</div>
              <StarRating value={item.criterios.servicio} readOnly size="lg" />
            </div>
          </div>

          <div className="flex items-center justify-between bg-blue-50 rounded-md p-3">
            <span className="text-blue-700 text-sm">Puntaje ponderado</span>
            <span className="font-semibold text-blue-700">
              {scoreToLabel(item.puntaje)} ({item.puntaje.toFixed(2)})
            </span>
          </div>
        </div>

        <div className="px-5 py-4 border-t flex justify-end">
          <button
            className="px-4 py-2 rounded-md bg-gray-800 text-white hover:bg-black transition"
            onClick={onClose}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

/** ================= Página ================= */
export default function EvaluacionProveedores() {
  const { register, handleSubmit, control, watch, reset } = useForm<FormFields>(
    {
      defaultValues: {
        proveedor: "",
        fecha: new Date().toISOString().slice(0, 10),
        calidad: 0,
        entrega: 0,
        precio: 0,
        servicio: 0,
        comentario: "",
        evaluador: "",
      },
    }
  );

  // Mock inicial (cámbialo por fetch a tu backend cuando tengas API)
  const [items, setItems] = useState<EvaluacionProveedor[]>([
    {
      id: "1",
      proveedor: "Suministros ABC",
      fecha: "2025-09-25",
      criterios: { calidad: 5, entrega: 4, precio: 4, servicio: 5 },
      comentario: "Entrega puntual y empaques correctos.",
      evaluador: "Laura",
      puntaje: calcPuntaje({ calidad: 5, entrega: 4, precio: 4, servicio: 5 }),
    },
    {
      id: "2",
      proveedor: "Logística Express",
      fecha: "2025-09-22",
      criterios: { calidad: 4, entrega: 5, precio: 3, servicio: 4 },
      comentario: "Muy rápidos, podrían mejorar tarifas.",
      evaluador: "Carlos",
      puntaje: calcPuntaje({ calidad: 4, entrega: 5, precio: 3, servicio: 4 }),
    },
    {
      id: "3",
      proveedor: "Materiales Premium",
      fecha: "2025-09-18",
      criterios: { calidad: 5, entrega: 3, precio: 3, servicio: 3 },
      comentario: "Excelente calidad, tiempos irregulares.",
      evaluador: "Ana",
      puntaje: calcPuntaje({ calidad: 5, entrega: 3, precio: 3, servicio: 3 }),
    },
  ]);

  /** Resumen */
  const total = items.length;
  const promedioGeneral = useMemo(() => {
    if (!total) return 0;
    return +(items.reduce((acc, it) => acc + it.puntaje, 0) / total).toFixed(2);
  }, [items, total]);

  const topProveedor = useMemo(() => {
    if (!items.length) return null;
    return [...items].sort((a, b) => b.puntaje - a.puntaje)[0];
  }, [items]);

  const criteriosPromedio = useMemo(() => {
    if (!items.length)
      return { calidad: 0, entrega: 0, precio: 0, servicio: 0 };
    const sum = items.reduce(
      (acc, it) => {
        acc.calidad += it.criterios.calidad;
        acc.entrega += it.criterios.entrega;
        acc.precio += it.criterios.precio;
        acc.servicio += it.criterios.servicio;
        return acc;
      },
      { calidad: 0, entrega: 0, precio: 0, servicio: 0 }
    );
    return {
      calidad: +(sum.calidad / items.length).toFixed(2),
      entrega: +(sum.entrega / items.length).toFixed(2),
      precio: +(sum.precio / items.length).toFixed(2),
      servicio: +(sum.servicio / items.length).toFixed(2),
    };
  }, [items]);

  /** Vista previa de puntaje mientras llenas el form */
  const liveScore = calcPuntaje({
    calidad: watch("calidad"),
    entrega: watch("entrega"),
    precio: watch("precio"),
    servicio: watch("servicio"),
  });

  /** Modal state */
  const [openDetalle, setOpenDetalle] = useState(false);
  const [selItem, setSelItem] = useState<EvaluacionProveedor | null>(null);
  const abrirDetalle = (it: EvaluacionProveedor) => {
    setSelItem(it);
    setOpenDetalle(true);
  };
  const cerrarDetalle = () => {
    setOpenDetalle(false);
    setSelItem(null);
  };

  /** Submit */
  const onSubmit = (data: FormFields) => {
    const criterios: Criterios = {
      calidad: data.calidad,
      entrega: data.entrega,
      precio: data.precio,
      servicio: data.servicio,
    };
    const nuevo: EvaluacionProveedor = {
      id: crypto.randomUUID(),
      proveedor: data.proveedor.trim(),
      fecha: data.fecha,
      criterios,
      comentario: data.comentario?.trim(),
      evaluador: data.evaluador?.trim(),
      puntaje: calcPuntaje(criterios),
    };
    setItems((prev) => [nuevo, ...prev]);
    toast.success("Evaluación registrada con éxito");
    reset({ ...data, proveedor: "", comentario: "", evaluador: "" });
  };

  return (
    <section>
      {/* Encabezado */}
      <div className="top flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold">Evaluación de Proveedores</h2>
          <p className="text-grisoscuro">
            Califica desempeño por criterios y visualiza el ranking general
          </p>
        </div>
        <div>
          <span className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-indigo-50 text-indigo-700">
            <LuUsers className="text-xl" />
            {total} evaluaciones
          </span>
        </div>
      </div>

      {/* Contenido */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Formulario */}
        <Card
          title="Nueva Evaluación"
          subtitle="Completa la información y asigna estrellas por criterio"
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
                {...register("proveedor", { required: true })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              <div>
                <label className="block">Fecha</label>
                <input
                  type="date"
                  className="border border-gray-300 rounded-md p-2 w-full"
                  {...register("fecha", { required: true })}
                />
              </div>
              <div>
                <label className="block">Evaluador (opcional)</label>
                <input
                  className="border border-gray-300 rounded-md p-2 w-full"
                  placeholder="Nombre de quien evalúa"
                  {...register("evaluador")}
                />
              </div>
            </div>

            {/* Criterios con estrellas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-2.5 border rounded-md overflow-hidden">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-medium text-sm">Calidad</span>
                  <Controller
                    control={control}
                    name="calidad" // cambia por entrega/precio/servicio según el bloque
                    render={({ field }) => (
                      <StarRating
                        value={field.value}
                        onChange={field.onChange}
                        size="sm"
                        className="sm:scale-100 scale-95"
                      />
                    )}
                  />
                </div>
                <p className="text-[11px] text-gray-500 mt-1">
                  Exactitud, defectos, cumplimiento de especificaciones.
                </p>
              </div>

              <div className="p-2.5 border rounded-md overflow-hidden">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-medium text-sm">Entrega</span>
                  <Controller
                    control={control}
                    name="entrega" // cambia por entrega/precio/servicio según el bloque
                    render={({ field }) => (
                      <StarRating
                        value={field.value}
                        onChange={field.onChange}
                        size="sm"
                        className="sm:scale-100 scale-95"
                      />
                    )}
                  />
                </div>
                <p className="text-[11px] text-gray-500 mt-1">
                  Exactitud, defectos, cumplimiento de especificaciones.
                </p>
              </div>

              <div className="p-2.5 border rounded-md overflow-hidden">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-medium text-sm">Precio</span>
                  <Controller
                    control={control}
                    name="precio" // cambia por entrega/precio/servicio según el bloque
                    render={({ field }) => (
                      <StarRating
                        value={field.value}
                        onChange={field.onChange}
                        size="sm"
                        className="sm:scale-100 scale-95"
                      />
                    )}
                  />
                </div>
                <p className="text-[11px] text-gray-500 mt-1">
                  Exactitud, defectos, cumplimiento de especificaciones.
                </p>
              </div>

              <div className="p-2.5 border rounded-md overflow-hidden">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-medium text-sm">Servicio</span>
                  <Controller
                    control={control}
                    name="servicio" // cambia por entrega/precio/servicio según el bloque
                    render={({ field }) => (
                      <StarRating
                        value={field.value}
                        onChange={field.onChange}
                        size="sm"
                        className="sm:scale-100 scale-95"
                      />
                    )}
                  />
                </div>
                <p className="text-[11px] text-gray-500 mt-1">
                  Exactitud, defectos, cumplimiento de especificaciones.
                </p>
              </div>
            </div>

            {/* Comentario */}
            <div>
              <label className="block">Comentario</label>
              <textarea
                className="border border-gray-300 rounded-md p-2 w-full"
                placeholder="Observaciones adicionales…"
                rows={3}
                {...register("comentario")}
              />
            </div>

            {/* Vista previa de puntaje */}
            <div className="flex items-center justify-between p-3 rounded-md bg-blue-50">
              <div className="flex items-center gap-2 text-blue-700">
                <LuInfo />
                <span className="text-sm">Puntaje ponderado (previo)</span>
              </div>
              <BadgePuntaje puntaje={liveScore} />
            </div>

            {/* Submit */}
            <div className="flex mt-4">
              <button
                type="submit"
                className="bg-green-500 text-white w-full font-semibold px-4 py-2 rounded-md hover:bg-green-600 transition"
              >
                Guardar evaluación
              </button>
              <Toaster position="top-right" reverseOrder={false} />
            </div>
          </form>
        </Card>

        {/* Listado compacto SIN estrellas visibles */}
        <Card
          title="Evaluaciones Registradas"
          subtitle="Historial de evaluaciones por proveedor"
        >
          {/* max-h-96 */}
          <div className="mt-4 grid grid-cols-1 gap-4 overflow-y-auto">
            {items.map((it) => (
              <div
                key={it.id}
                className="flex flex-col gap-2 bg-gray-100/60 p-4 rounded-lg shadow"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-semibold truncate">{it.proveedor}</p>
                    <div className="text-xs text-gray-600 flex items-center gap-3 mt-0.5">
                      <span className="inline-flex items-center gap-1">
                        <LuCalendarDays />
                        {formatDate(it.fecha)}
                      </span>
                      {it.evaluador && (
                        <span className="inline-flex items-center gap-1">
                          <LuUsers />
                          {it.evaluador}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-sm font-semibold text-blue-700">
                      {scoreToLabel(it.puntaje)} ({it.puntaje.toFixed(2)})
                    </div>
                  </div>
                </div>

                {it.comentario && (
                  <p className="text-sm text-gray-700 line-clamp-2">
                    {it.comentario}
                  </p>
                )}

                <div className="pt-1">
                  <button
                    onClick={() => abrirDetalle(it)}
                    className="inline-flex items-center justify-center px-3 py-1.5 rounded-md text-sm font-medium bg-white hover:bg-gray-50 border transition cursor-pointer"
                  >
                    Más detalles
                  </button>
                </div>
              </div>
            ))}

            {!items.length && (
              <div className="text-sm text-gray-500">
                Aún no hay evaluaciones.
              </div>
            )}
          </div>

          {/* Modal de detalle con estrellas */}
          <ModalDetalleEvaluacion
            open={openDetalle}
            onClose={cerrarDetalle}
            item={selItem}
          />
        </Card>

        {/* Resumen */}
        <Card title="Resumen de Evaluaciones" subtitle="Indicadores clave">
          <div className="mt-4 flex flex-col gap-4">
            <div className="flex items-center justify-between p-3 bg-green-100 rounded-md">
              <span className="font-medium text-green-700">
                Promedio general
              </span>
              <span className="font-bold text-green-700">
                {promedioGeneral.toFixed(2)} / 5
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-gray-50 rounded-md">
                <div className="text-xs text-gray-500 mb-1">Calidad</div>
                <div className="flex items-center justify-between">
                  <StarRating
                    value={criteriosPromedio.calidad}
                    readOnly
                    size="sm"
                  />
                  <span className="text-sm font-semibold">
                    {criteriosPromedio.calidad}
                  </span>
                </div>
              </div>
              <div className="p-3 bg-gray-50 rounded-md">
                <div className="text-xs text-gray-500 mb-1">Entrega</div>
                <div className="flex items-center justify-between">
                  <StarRating
                    value={criteriosPromedio.entrega}
                    readOnly
                    size="sm"
                  />
                  <span className="text-sm font-semibold">
                    {criteriosPromedio.entrega}
                  </span>
                </div>
              </div>
              <div className="p-3 bg-gray-50 rounded-md">
                <div className="text-xs text-gray-500 mb-1">Precio</div>
                <div className="flex items-center justify-between">
                  <StarRating
                    value={criteriosPromedio.precio}
                    readOnly
                    size="sm"
                  />
                  <span className="text-sm font-semibold">
                    {criteriosPromedio.precio}
                  </span>
                </div>
              </div>
              <div className="p-3 bg-gray-50 rounded-md">
                <div className="text-xs text-gray-500 mb-1">Servicio</div>
                <div className="flex items-center justify-between">
                  <StarRating
                    value={criteriosPromedio.servicio}
                    readOnly
                    size="sm"
                  />
                  <span className="text-sm font-semibold">
                    {criteriosPromedio.servicio}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-blue-100 rounded-md">
              <div className="flex items-center gap-2 text-blue-700">
                <LuTrophy className="text-xl" />
                <span className="text-sm">Top proveedor del periodo</span>
              </div>
              <div className="text-right">
                {topProveedor ? (
                  <>
                    <div className="font-semibold text-blue-700">
                      {topProveedor.proveedor}
                    </div>
                    <div className="text-sm text-blue-700">
                      Puntaje {topProveedor.puntaje.toFixed(2)} / 5
                    </div>
                  </>
                ) : (
                  <span className="text-sm text-blue-700">—</span>
                )}
              </div>
            </div>

            <div className="flex items-start gap-2 text-xs text-gray-500">
              <LuInfo className="mt-0.5" />
              <p>
                Ponderación: Calidad 40%, Entrega 30%, Precio 20%, Servicio 10%.
                Ajusta estos pesos en el código si tu política cambia.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
