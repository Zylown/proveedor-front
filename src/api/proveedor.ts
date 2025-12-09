import axios from 'axios'
import type {
  CreateProveedor,
  Proveedor,
  UpdateProveedor
} from '../types/Proveedores.types'

// url desarrollo
// const API_URL = 'http://localhost:3000'
// url producción
const API_URL = 'https://proveedor-back-a1051c0b9289.herokuapp.com'

export const crearProveedor = async (payload: CreateProveedor) => {
  try {
    const { data } = await axios.post(`${API_URL}/proveedor`, payload)
    return data
  } catch (error) {
    const message =
      axios.isAxiosError(error) && error.response?.data?.message
        ? error.response.data.message
        : 'Error al registrar proveedor'
    throw new Error(message)
  }
}

export const obtenerProveedores = async (): Promise<Proveedor[]> => {
  const { data } = await axios.get(`${API_URL}/proveedor`)
  return Array.isArray(data) ? data : data.items
}

// categorias de proveedores
export const obtenerCategoriasProveedores = async () => {
  const { data } = await axios.get(`${API_URL}/categoria-proveedor/select`)
  return Array.isArray(data) ? data : data.items
}

export const obtenerEstadosProveedores = async () => {
  const { data } = await axios.get(`${API_URL}/estado/select`)
  return Array.isArray(data) ? data : data.items
}

// =====================================================
// 🔥✨ NUEVO — ACTUALIZAR PROVEEDOR (PATCH /proveedor/:id)
// =====================================================
export const actualizarProveedor = async (
  id: number,
  data: UpdateProveedor | CreateProveedor
) => {
  const res = await axios.patch(`${API_URL}/proveedor/${id}`, data)
  return res.data
}

// Eliminar proveedor
export async function eliminarProveedor(id: number) {
  const res = await axios.delete(`${API_URL}/proveedor/${id}`)
  return res.data
}
