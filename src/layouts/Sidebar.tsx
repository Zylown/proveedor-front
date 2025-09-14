import {
  AiOutlineHome,
  AiOutlineTeam,
  AiOutlineFileAdd,
  AiOutlineShoppingCart,
  AiOutlineTruck,
  AiOutlineDollarCircle,
  AiOutlineAppstoreAdd,
} from "react-icons/ai";

export default function Sidebar() {
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
      link: "/#",
    },
    {
      title: "Órdenes de compra",
      icon: AiOutlineShoppingCart,
      link: "/#",
    },
    {
      title: "Seguimiento de Entregas",
      icon: AiOutlineTruck,
      link: "/#",
    },
    {
      title: "Facturación y Pagos",
      icon: AiOutlineDollarCircle,
      link: "/#",
    },
    {
      title: "Evaluación de Proveedores",
      icon: AiOutlineAppstoreAdd,
      link: "/#",
    },
  ];

  return (
    <div className="border-r pt-2 h-screen justify-center min-w-3xs">
      <div className="logo flex items-center gap-2 px-4 py-3 border-b border-[#D0D0D0]">
        <AiOutlineTeam className="text-3xl" />
        <h2 className="text-lg font-semibold">SupplierPro</h2>
      </div>
      <div className="modulos px-4 mt-6">
        <h4 className="text-xs font-medium">Módulos</h4>
        <ul className="space-y-2 mt-3">
          {/* Mapeo */}
          {sidebarItems.map((item) => (
            <li key={item.title}>
              <a
                href={item.link}
                className="flex items-center gap-3 px-3 py-2 text-sm font-medium hover:bg-azulbrillante hover:text-white rounded-md transition-colors"
              >
                {/* {item.icon} */}
                {<item.icon className="text-xl" />}
                <span>{item.title}</span>
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
