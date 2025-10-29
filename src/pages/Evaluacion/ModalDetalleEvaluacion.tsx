import { LuX, LuCalendarDays, LuUsers } from "react-icons/lu";

function ModalDetalleEvaluacion({
  open,
  onClose,
  item,
  StarRating, // pásale tu StarRating para reusar
}: {
  open: boolean;
  onClose: () => void;
  item: Evaluacion | null;
  StarRating: React.ComponentType<{
    value: number;
    readOnly?: boolean;
    size?: string;
  }>;
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
