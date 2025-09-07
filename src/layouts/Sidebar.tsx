import { AiOutlineHome } from "react-icons/ai";

export default function Sidebar() {
  return (
    <div className="border-r p-6">
      <div className="pb-3 border-b text-lg font-bold">
        {/* icon */}
        SupplierPro
      </div>
      <div className="mt-6">
        <h4 className="text-xs">Módulos</h4>
        <ul className="space-y-2 mt-3">
          <li>
            <a href="#" className="flex items-center space-x-2">
              <AiOutlineHome />
              <span>Inicio</span>
            </a>
          </li>
          <li>Registro de Proveedores</li>
          <li>Órdenes de compra</li>
          <li>Seguimiento de Entregas</li>
          <li>Facturación y Pagos</li>
          <li>Evaluación de Proveedores</li>
        </ul>
      </div>
    </div>
  );
}
