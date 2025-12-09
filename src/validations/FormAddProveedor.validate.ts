import { z } from 'zod'

export const FormAddProveedorSchema = z.object({
  ruc: z
    .string()
    .min(11, 'El RUC debe tener 11 dígitos')
    .max(11, 'El RUC debe tener 11 dígitos')
    .regex(/^\d+$/, 'El RUC solo debe contener números'),

  razon_social: z
    .string()
    .min(2, 'La razón social es obligatoria')
    .max(150, 'Máximo 150 caracteres'),

  direccion: z.string().max(200, 'Máximo 200 caracteres').optional(),

  telefono: z.string().max(20, 'Máximo 20 caracteres').optional(),

  email: z
    .string()
    .email('El correo electrónico no es válido')
    .max(100, 'Máximo 100 caracteres')
    .optional(),

  contacto_principal: z.string().max(100, 'Máximo 100 caracteres').optional(),

  calificacion_promedio: z
    .string()
    .optional() // el input range devuelve string, luego lo transformas
    .transform(val => (val ? Number(val) : undefined)),

  id_categoria: z
    .string()
    .optional()
    .transform(val => (val ? Number(val) : undefined)),

  id_estado: z.string().min(1, 'Seleccione un estado').transform(Number)
})
