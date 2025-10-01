import {
  AiOutlineHome,
  AiOutlineTeam,
  AiOutlineFileAdd,
  AiOutlineShoppingCart,
  AiOutlineTruck,
  AiOutlineDollarCircle,
  AiOutlineAppstoreAdd,
} from "react-icons/ai";

interface SidebarProps {
  isOpen: boolean;
}
//es lo mismo ({ isOpen }: { isOpen: boolean })
export default function Sidebar({ isOpen }: SidebarProps) {
  // esto es un array con los items del sidebar y mapearlos en vez de hardcodearlos
  const sidebarItems = [
    {
      title: "Inicio",
      // icon: <AiOutlineHome className="text-xl" />,
      icon: AiOutlineHome,
      link: "/dashboard",
    },
    {
      title: "Registro de Proveedores",
      icon: AiOutlineFileAdd,
      link: "/proveedores",
    },
    {
      title: "Órdenes de compra",
      icon: AiOutlineShoppingCart,
      link: "/order",
    },
    {
      title: "Seguimiento de Entregas",
      icon: AiOutlineTruck,
      link: "/entregas",
    },
    {
      title: "Facturación y Pagos",
      icon: AiOutlineDollarCircle,
      link: "/facturacion",
    },
    {
      title: "Evaluación de Proveedores",
      icon: AiOutlineAppstoreAdd,
      link: "/#",
    },
  ];

  return (
    <div className="h-screen flex flex-col">
      <div className="logo flex items-center gap-2 px-4 py-[8.6px] border-b border-gristransparente">
        <AiOutlineTeam className="text-3xl" />
        {isOpen && <h2 className="text-lg font-semibold">SupplierPro</h2>}
      </div>
      {/* <div className="modulos px-4 mt-6"> */}
      <div className={`modulos ${isOpen ? "px-4" : "px-2"} mt-6`}>
        {isOpen && (
          <h4 className="text-xs font-medium text-grisoscuro">Módulos</h4>
        )}
        <ul className="space-y-2 mt-3">
          {/* Mapeo */}
          {sidebarItems.map((item) => (
            <li key={item.title}>
              <a
                href={item.link}
                className={`flex items-center ${
                  isOpen ? "" : "justify-center"
                } gap-3 px-2 py-2 text-sm font-medium hover:bg-azulbrillante hover:text-white rounded-md transition-colors w-full`}
              >
                {<item.icon className="text-xl" />}
                {isOpen && <span>{item.title}</span>}
              </a>
            </li>
          ))}

          {/* <a
              href="#"
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium hover:bg-azulbrillante hover:text-white rounded-md transition-colors"
            >
              <AiOutlineHome className="text-xl" />
              <span>Inicio</span>
            </a> */}
        </ul>
      </div>
    </div>
  );
}
