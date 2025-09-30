export type Proveedor = {
  id: number;
  nombreComercial: string;
  razonSocial: string;
  ruc: string;
  direccion: string;
  telefono: string;
  email: string;
  tipoProveedor: "Nacional" | "Internacional";
  descripcion?: string;
};
