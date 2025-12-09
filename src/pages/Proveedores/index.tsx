import { useEffect, useState } from 'react'
import Card from '../../components/Card'
import { useForm } from 'react-hook-form'
import type {
  CategoriaProveedor,
  Proveedor
} from '../../types/Proveedores.types'
import toast, { Toaster } from 'react-hot-toast'
import { LuBuilding } from 'react-icons/lu'
import {
  AiOutlinePhone,
  AiOutlineMail,
  AiOutlineUser,
  AiFillStar
} from 'react-icons/ai'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormAddProveedorSchema } from '../../validations/FormAddProveedor.validate'

const tiempoRelativo = (fecha: string) => {
  const ahora = new Date()
  const creacion = new Date(fecha)
  const diffMs = ahora.getTime() - creacion.getTime()
  const diffDias = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDias === 0) return 'Hoy'
  if (diffDias === 1) return 'Hace 1 día'
  if (diffDias < 7) return `Hace ${diffDias} días`
  if (diffDias < 30)
    return `Hace ${Math.floor(diffDias / 7)} semana${
      Math.floor(diffDias / 7) > 1 ? 's' : ''
    }`
  return `Hace ${Math.floor(diffDias / 30)} mes${
    Math.floor(diffDias / 30) > 1 ? 'es' : ''
  }`
}

export default function Proveedores() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(FormAddProveedorSchema)
  })

  const [proveedores, setProveedores] = useState<Proveedor[]>([])
  const [categorias, setCategorias] = useState<CategoriaProveedor[]>([]) // el ([]) significa que inicia como un arreglo vacío

  const [estados, setEstados] = useState<
    { id_estado: number; nombre: string }[]
  >([])

  const [loading, setLoading] = useState(true)

  const onSubmit = (data: Proveedor) => {
    toast.success('Proveedor registrado con éxito')
    console.log(data)
  }

  const Spinner = () => (
    <div className="flex justify-center py-6">
      <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  )

  //url desarrollo
  // const API_URL = 'http://localhost:3000'
  // url produccion
  const API_URL = 'https://proveedor-back-a1051c0b9289.herokuapp.com'

  useEffect(() => {
    const fetchProveedores = async () => {
      try {
        const res = await fetch(`${API_URL}/proveedor`)
        const data = await res.json()

        console.log(data)

        // si viene paginado: { items: [...] }
        const lista = Array.isArray(data) ? data : data.items

        setProveedores(lista)
      } catch (err) {
        console.error('Error al cargar proveedores:', err)
      } finally {
        setLoading(false)
      }
    }
    const fetchCategorias = async () => {
      try {
        const res = await fetch(`${API_URL}/categoria-proveedor/select`)
        const data = await res.json()
        setCategorias(data)
      } catch (err) {
        console.error('Error al cargar categorías:', err)
      }
    }

    const fetchEstados = async () => {
      try {
        const res = await fetch(`${API_URL}/estado/select`)
        const data = await res.json()
        setEstados(data)
      } catch (err) {
        console.error('Error al cargar estados:', err)
      }
    }

    fetchProveedores()
    fetchCategorias()
    fetchEstados()
  }, [])

  return (
    <section>
      {/*Cabecera */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold">Registro de Proveedores</h2>
          <p className="text-gray-600">
            Gestiona la información de tus proveedores
          </p>
        </div>
        <div>
          <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
            <LuBuilding className="text-xl" /> Nuevo Proveedor
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* FORMULARIO */}
        <Card
          title="Información del Proveedor"
          subtitle="Completa los datos básicos del proveedor"
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-4 flex flex-col gap-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Campo RUC */}
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  {' '}
                  RUC
                </label>
                <input
                  className="border border-gray-300 rounded-md p-2 w-full"
                  placeholder="20123456789"
                  maxLength={11}
                  {...register('ruc', {
                    required: 'El RUC es obligatorio',
                    pattern: {
                      value: /^\d{11}$/,
                      message: 'Debe teber exactamente 11 dígitos númericos'
                    }
                  })}
                />
                {errors.ruc && (
                  <p className="text-red-500 text-sm">{errors.ruc.message}</p>
                )}
              </div>
              {/*Razón Social*/}
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Razón Social *
                </label>
                <input
                  className="border border-gray-300 rounded-md p-2 w-full"
                  placeholder="ConcreMix Perú SAC"
                  {...register('razonSocial', {
                    required: 'La Razón Social es obligatoria',
                    minLength: { value: 2, message: 'Mínimo 2 caractares' },
                    maxLength: { value: 150, message: 'Máximo 150 caracteres' }
                  })}
                />
                {errors.razonSocial && (
                  <p className="text-red-500 text-sm">
                    {errors.razonSocial.message}
                  </p>
                )}
              </div>
              {/*Dirección*/}
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Dirección
                </label>
                <input
                  className="border border-gray-300 rounded-md p-2 w-full"
                  placeholder="Av. Industrial 123, Lima"
                  {...register('direccion', {
                    maxLength: { value: 200, message: 'Máximo 200 caracteres' }
                  })}
                />
                {errors.direccion && (
                  <p className=" text-red-500 text-sm">
                    {errors.direccion.message}
                  </p>
                )}
              </div>
              {/*Teléfono*/}
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Teléfono
                </label>
                <input
                  className="border border-gray-300 rounded-md p-2 w-full"
                  placeholder="01-444112 o +51 987 654 321"
                  {...register('telefono', {
                    maxLength: { value: 20, message: 'Máximo 20 caracteres' }
                  })}
                />
                {errors.telefono && (
                  <p className="text-red-500 text-sm">
                    {errors.telefono.message}
                  </p>
                )}
              </div>

              {/*Email*/}
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  className="border border-gray-300 rounded-md p-2 w-full"
                  placeholder="contacto@proveedor.com"
                  {...register('email', {
                    maxLength: { value: 100, message: 'Máximo 100 caracteres' },
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Formato de correo ínvalido'
                    }
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
              {/*Contacto Principal*/}
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Contacto Principal
                </label>
                <input
                  className="border border-gray-300 rounded-md p-2 w-full"
                  placeholder="Juan Pérez"
                  {...register('contacto_principal', {
                    maxLength: { value: 100, message: 'Máximo 100 caracteres' }
                  })}
                />
                {errors.contacto_principal && (
                  <p className="text-red-500 text-sm">
                    {errors.contacto_principal.message}
                  </p>
                )}
              </div>
              {/*Calificación Promedio*/}
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Calificación Promedio (0-5)
                </label>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.1"
                  className="w-full"
                  {...register('calificacion_promedio')}
                />
              </div>
              {/*Estado*/}
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Estado *
                </label>
                <select
                  className="border border-gray-300 rounded-md p-2 w-full"
                  {...register('id_estado', {
                    required: 'Seleccione un estado'
                  })}
                  defaultValue=""
                >
                  <option value="">Seleccione un estado</option>
                  {estados.map(e => (
                    <option key={e.id_estado} value={e.id_estado}>
                      {e.nombre}
                    </option>
                  ))}
                </select>

                {errors.id_estado && (
                  <p className="text-red-500 text-sm">
                    {errors.id_estado.message}
                  </p>
                )}
              </div>
              {/*Categoría*/}
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Categoría
                </label>
                <select
                  className="border border-gray-300 rounded-md p-2 w-full"
                  {...register('id_categoria')}
                >
                  <option value="">Seleccione una categoría</option>
                  {categorias.map(c => (
                    <option key={c.id_categoria} value={c.id_categoria}>
                      {c.nombre}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white w-full py-2 rounded-md mt-2 hover:bg-blue-600 transition font-medium"
            >
              Registrar Proveedor
            </button>
            <Toaster position="top-right" />
          </form>
        </Card>

        {/* PROVEEDORES REGISTRADOS */}
        <Card
          title="Proveedores Registrados"
          subtitle="Lista de proveedores activos en el sistema"
        >
          {loading ? (
            <Spinner />
          ) : (
            <ul className="space-y-4 mt-4 max-h-[32rem] overflow-y-auto">
              {proveedores.map((p: any) => (
                <li
                  key={p.id_proveedor}
                  className="relative bg-white rounded-xl shadow-md hover:shadow-lg transition border border-gray-200 p-4 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4"
                >
                  <div className="flex items-start gap-3 sm:flex-1">
                    <LuBuilding className="text-gray-400 text-3xl mt-1" />
                    <div className="flex flex-col gap-1">
                      <p className="font-bold text-gray-900 text-lg">
                        {p.razon_social}
                      </p>
                      <p className="text-gray-600 text-sm">RUC: {p.ruc}</p>
                      <p className="text-gray-600 text-xs truncate max-w-xs">
                        {p.direccion}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1 sm:text-right sm:min-w-[180px]">
                    <p className="text-gray-800 flex items-center gap-1">
                      <AiOutlinePhone className="w-4 h-4 text-gray-500" />{' '}
                      {p.telefono}
                    </p>
                    <p className="text-gray-800 flex items-center gap-1">
                      <AiOutlineMail className="w-4 h-4 text-gray-500" />{' '}
                      {p.email}
                    </p>
                    <p className="text-gray-800 flex items-center gap-1">
                      <AiOutlineUser className="w-4 h-4 text-gray-500" />{' '}
                      {p.contacto_principal}
                    </p>
                  </div>

                  <div className="flex flex-col items-start sm:items-end gap-1 mt-2 sm:mt-0">
                    <span
                      className={`px-2 py-1 rounded-md text-sm font-semibold ${
                        p.estado?.nombre === 'activo'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {p.estado?.nombre?.toUpperCase() || 'SIN ESTADO'}
                    </span>
                    <p className="text-gray-400 text-xs">
                      {tiempoRelativo(p.fecha_creacion)}
                    </p>

                    <div className="flex items-center gap-1 text-yellow-500 font-semibold mt-1">
                      <AiFillStar className="w-4 h-4" />{' '}
                      {p.calificacion_promedio || 'N/A'}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </section>
  )
}
