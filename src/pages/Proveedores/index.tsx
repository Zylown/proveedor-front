import { useEffect, useState } from 'react'
import Card from '../../components/Card'
import { useForm } from 'react-hook-form'
import type {
  CategoriaProveedor,
  CreateProveedor,
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
import {
  crearProveedor,
  obtenerProveedores,
  obtenerCategoriasProveedores,
  obtenerEstadosProveedores,
  actualizarProveedor,
  eliminarProveedor // 🔥 IMPORTANTE
} from '../../api/proveedor.ts'

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
    watch,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(FormAddProveedorSchema)
  })
  // modal de confirmar eliminación
  const [modalEliminar, setModalEliminar] = useState(false)
  const [proveedorAEliminar, setProveedorAEliminar] =
    useState<Proveedor | null>(null)

  const abrirModalEliminar = (p: Proveedor) => {
    setProveedorAEliminar(p)
    setModalEliminar(true)
  }

  const confirmarEliminar = async () => {
    if (!proveedorAEliminar) return

    try {
      await eliminarProveedor(proveedorAEliminar.id_proveedor)

      toast.success('Proveedor eliminado correctamente')

      const lista = await obtenerProveedores()
      setProveedores(lista)

      // Si estaba editándolo, cerramos edición
      if (
        modoEdicion &&
        proveedorSeleccionado?.id_proveedor === proveedorAEliminar.id_proveedor
      ) {
        finalizarEdicion()
      }
    } catch (err) {
      console.error(err)
      toast.error('Error eliminando proveedor')
    } finally {
      setModalEliminar(false)
      setProveedorAEliminar(null)
    }
  }

  const [proveedores, setProveedores] = useState<Proveedor[]>([])
  const [categorias, setCategorias] = useState<CategoriaProveedor[]>([])
  const [estados, setEstados] = useState<
    { id_estado: number; nombre: string }[]
  >([])

  const [modoEdicion, setModoEdicion] = useState(false)
  const [proveedorSeleccionado, setProveedorSeleccionado] =
    useState<Proveedor | null>(null)

  const [loading, setLoading] = useState(true)

  // ===========================================================
  // SUBMIT
  // ===========================================================
  const onSubmit = async (data: CreateProveedor) => {
    try {
      const payload = {
        ruc: data.ruc,
        razon_social: data.razon_social,
        direccion: data.direccion || null,
        telefono: data.telefono || null,
        email: data.email || null,
        contacto_principal: data.contacto_principal || null,
        calificacion_promedio: Number(data.calificacion_promedio) || null,
        id_categoria: data.id_categoria ? Number(data.id_categoria) : null,
        id_estado: Number(data.id_estado)
      }

      if (!modoEdicion) {
        await crearProveedor(payload)
        toast.success('Proveedor registrado con éxito')
        reset()
      } else {
        if (proveedorSeleccionado) {
          await actualizarProveedor(proveedorSeleccionado.id_proveedor, payload)
        }
        toast.success('Proveedor actualizado')
      }

      const lista = await obtenerProveedores()
      setProveedores(lista)
    } catch (err) {
      console.error(err)
      toast.error('Error al guardar proveedor')
    }
  }

  // ===========================================================
  // CARGAR INFO EN FORMULARIO
  // ===========================================================
  const iniciarEdicion = (p: Proveedor) => {
    setModoEdicion(true)
    setProveedorSeleccionado(p)

    reset({
      ruc: p.ruc ?? '',
      razon_social: p.razon_social ?? '',
      direccion: p.direccion ?? '',
      telefono: p.telefono ?? '',
      email: p.email ?? '',
      contacto_principal: p.contacto_principal ?? '',
      calificacion_promedio: p.calificacion_promedio?.toString() ?? '0',
      id_categoria: p.categoria?.id_categoria?.toString() ?? '',
      id_estado: p.estado?.id_estado?.toString() ?? ''
    })
  }

  // ===========================================================
  // FINALIZAR EDICIÓN
  // ===========================================================
  const finalizarEdicion = () => {
    setModoEdicion(false)
    setProveedorSeleccionado(null)

    reset({
      ruc: '',
      razon_social: '',
      direccion: '',
      telefono: '',
      email: '',
      contacto_principal: '',
      calificacion_promedio: '0',
      id_categoria: '',
      id_estado: ''
    })
  }

  // ===========================================================
  // CARGA INICIAL
  // ===========================================================
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const listaProveedores = await obtenerProveedores()
        const categoriasData = await obtenerCategoriasProveedores()
        const estadosData = await obtenerEstadosProveedores()

        setProveedores(listaProveedores)
        setCategorias(categoriasData)
        setEstados(estadosData)
      } catch (error) {
        console.error('Error al obtener proveedores:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const Spinner = () => (
    <div className="flex justify-center py-6">
      <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  )

  // ===========================================================
  // RENDER
  // ===========================================================
  return (
    <section>
      {/* CABECERA */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold">Registro de Proveedores</h2>
          <p className="text-gray-600">
            Gestiona la información de tus proveedores
          </p>
        </div>

        {modoEdicion && (
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-md cursor-pointer transition text-white bg-green-600 hover:bg-green-700"
            onClick={finalizarEdicion}
          >
            <LuBuilding className="text-xl" />
            Finalizar edición
          </button>
        )}
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
              {/* Inputs */}
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  RUC *
                </label>
                <input
                  className="border border-gray-300 rounded-md p-2 w-full"
                  placeholder="20123456789"
                  maxLength={11}
                  {...register('ruc')}
                />
                {errors.ruc && (
                  <p className="text-red-500 text-sm">{errors.ruc.message}</p>
                )}
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Razón Social *
                </label>
                <input
                  className="border border-gray-300 rounded-md p-2 w-full"
                  placeholder="ConcreMix Perú SAC"
                  {...register('razon_social')}
                />
                {errors.razon_social && (
                  <p className="text-red-500 text-sm">
                    {errors.razon_social.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Dirección
                </label>
                <input
                  className="border border-gray-300 rounded-md p-2 w-full"
                  placeholder="Av. Industrial 123, Lima"
                  {...register('direccion')}
                />
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Teléfono
                </label>
                <input
                  className="border border-gray-300 rounded-md p-2 w-full"
                  placeholder="01-444112 o +51 987 654 321"
                  {...register('telefono')}
                />
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  className="border border-gray-300 rounded-md p-2 w-full"
                  placeholder="contacto@proveedor.com"
                  {...register('email')}
                />
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Contacto Principal
                </label>
                <input
                  className="border border-gray-300 rounded-md p-2 w-full"
                  placeholder="Juan Pérez"
                  {...register('contacto_principal')}
                />
              </div>

              <div>
                <label className="block mb-3 font-medium text-gray-700">
                  Calificación Promedio ({watch('calificacion_promedio') || 0})
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

              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Estado *
                </label>
                <select
                  className="border p-2 rounded-md w-full"
                  {...register('id_estado')}
                >
                  <option value="">Seleccione un estado</option>
                  {estados.map(e => (
                    <option key={e.id_estado} value={e.id_estado}>
                      {e.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Categoría
                </label>
                <select
                  className="border p-2 rounded-md w-full"
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
              className={`w-full py-2 rounded-md mt-2 font-medium text-white ${
                modoEdicion
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {modoEdicion ? 'Guardar Cambios' : 'Registrar Proveedor'}
            </button>
          </form>

          <Toaster position="top-right" />
        </Card>

        {/* LISTA DE PROVEEDORES */}
        <Card
          title="Proveedores Registrados"
          subtitle="Haz clic en un proveedor para editarlo"
        >
          {loading ? (
            <Spinner />
          ) : (
            <ul className="space-y-4 mt-4 max-h-[32rem] overflow-y-auto">
              {proveedores.map(p => {
                const seleccionado =
                  modoEdicion &&
                  proveedorSeleccionado?.id_proveedor === p.id_proveedor

                return (
                  <li
                    key={p.id_proveedor}
                    onClick={() => iniciarEdicion(p)}
                    className={`
                      relative cursor-pointer rounded-xl shadow-md hover:shadow-lg transition border 
                      p-4 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4
                      ${
                        seleccionado
                          ? 'border-green-500 bg-green-50/40'
                          : 'border-gray-200 bg-white'
                      }
                    `}
                  >
                    {/* BOTÓN ELIMINAR (solo cuando está seleccionado) */}
                    {seleccionado && (
                      <button
                        onClick={e => {
                          e.stopPropagation() // evita que active editar
                          abrirModalEliminar(p)
                        }}
                        className="absolute top-2 right-2 text-red-600 hover:text-red-800 font-bold"
                      >
                        Eliminar
                      </button>
                    )}

                    {/* COLUMNA IZQ */}
                    <div className="flex items-start gap-3">
                      <LuBuilding className="text-gray-400 text-3xl mt-1" />
                      <div>
                        <p className="font-bold text-lg">{p.razon_social}</p>
                        <p className="text-gray-600 text-sm">RUC: {p.ruc}</p>
                        <p className="text-gray-600 text-xs">{p.direccion}</p>
                      </div>
                    </div>

                    {/* COLUMNA DER */}
                    <div className="flex flex-col gap-1 sm:text-right">
                      <p className="flex items-center gap-1">
                        <AiOutlinePhone className="w-4 h-4 text-gray-500" />{' '}
                        {p.telefono}
                      </p>

                      <p className="flex items-center gap-1">
                        <AiOutlineMail className="w-4 h-4 text-gray-500" />{' '}
                        {p.email}
                      </p>

                      <p className="flex items-center gap-1">
                        <AiOutlineUser className="w-4 h-4 text-gray-500" />{' '}
                        {p.contacto_principal}
                      </p>

                      {/* BADGE ESTADO */}
                      <span
                        className={`
                          inline-block mt-1 px-3 py-0.5 rounded-full text-xs font-semibold border
                          ${
                            p.estado?.nombre === 'activo'
                              ? 'bg-green-100 text-green-700 border-green-300'
                              : 'bg-red-100 text-red-700 border-red-300'
                          }
                        `}
                      >
                        {p.estado?.nombre?.toUpperCase() || 'SIN ESTADO'}
                      </span>

                      <p className="text-gray-400 text-xs">
                        {tiempoRelativo(p.fecha_creacion || '')}
                      </p>

                      <div className="flex items-center gap-1 text-yellow-500 font-semibold mt-1">
                        <AiFillStar className="w-4 h-4" />{' '}
                        {p.calificacion_promedio || 'N/A'}
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </Card>
      </div>
      {modalEliminar && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
            <h2 className="text-xl font-bold mb-2 text-red-600">
              Eliminar Proveedor
            </h2>

            <p className="text-gray-700 mb-4">
              ¿Estás seguro de que deseas eliminar al proveedor{' '}
              <strong>{proveedorAEliminar?.razon_social}</strong>?
            </p>

            <p className="text-gray-700 mb-4 text-sm">
              ⚠ Esta acción también eliminará todas sus evaluaciones y registros
              asociados.
              <br />
              Esta acción es <strong>irreversible</strong>.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setModalEliminar(false)
                  setProveedorAEliminar(null)
                }}
                className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
              >
                Cancelar
              </button>

              <button
                onClick={confirmarEliminar}
                className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
              >
                Eliminar definitivamente
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
