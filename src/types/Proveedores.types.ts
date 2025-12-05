export type Proveedor = {
  id: number
  contacto_principal: string
  razonSocial: string
  calificacion_promedio: number
  estado: 'activo' | 'inactivo'
  ruc: string
  direccion: string
  telefono: string
  email: string
  descripcion?: string
  id_categoria: number
  fecha_creacion: string
}
