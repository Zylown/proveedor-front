import { z } from 'zod'

export const FormAddProveedorSchema = z.object({
  nombreComercial: z.string().min(1, 'El nombre comercial es obligatorio'),
  razonSocial: z.string().min(1, 'La razón social es obligatoria'),
  ruc: z
    .string()
    .min(11, 'El RUC debe tener 11 dígitos')
    .max(11, 'El RUC debe tener 11 dígitos'),
  direccion: z.string().min(1, 'La dirección es obligatoria'),
  telefono: z
    .string()
    .min(7, 'El teléfono debe tener al menos 7 dígitos')
    .max(15, 'El teléfono no debe exceder los 15 dígitos'),
  email: z.string().email('El correo electrónico no es válido'),
  tipoProveedor: z.enum(
    ['Nacional', 'Internacional'],
    'El tipo de proveedor es obligatorio'
  ),
  descripcion: z.string().optional()
})
