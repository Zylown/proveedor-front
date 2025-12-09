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

// 👇 Nuevo tipo correcto para crear un proveedor
export interface CreateProveedor {
  ruc: string
  razon_social: string
  direccion?: string | null
  telefono?: string | null
  email?: string | null
  contacto_principal?: string | null
  calificacion_promedio?: number | null
  id_categoria?: number | null
  id_estado: number
}

export type CategoriaProveedor = {
  id_categoria: number
  nombre: string
  descripcion?: string
  estado: 'activo' | 'inactivo'
  fecha_creacion: string
  fecha_actualizacion: string
}
