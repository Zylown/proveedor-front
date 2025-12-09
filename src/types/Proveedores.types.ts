export interface Proveedor {
  id_proveedor: number
  ruc: string
  razon_social: string
  direccion?: string
  telefono?: string
  email?: string
  contacto_principal?: string
  calificacion_promedio?: number
  fecha_creacion?: string

  id_categoria?: number
  categoria?: CategoriaProveedor

  id_estado?: number
  estado?: {
    id_estado: number
    nombre: string
  }
}

export type CategoriaProveedor = {
  id: number
  nombre: string
  descripcion?: string
  estado: 'activo' | 'inactivo'
  fecha_creacion: string
  fecha_actualizacion: string
}
