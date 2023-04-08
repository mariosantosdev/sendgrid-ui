import { z } from 'zod'

export const sendMailScheme = z
  .object({
    from: z
      .string()
      .email('E-mail inválido')
      .min(0, 'O campo e-mail de destino (from) é obrigatorio'),
    to: z
      .string()
      .email('E-mail inválido')
      .min(0, 'O campo e-mail de destino (to) é obrigatorio'),
    templateId: z.string().min(0, 'O campo templateId é obrigatorio'),
    dynamicTemplateData: z.object({
      key: z.unknown(),
    }),
  })
  .strict()

export const sendMailHeaders = z.object({
  'api-key': z
    .string({
      required_error: 'Informe a chave de API do Sendgrid',
    })
    .min(3, 'Informe a chave de API do Sendgrid')
    .regex(/^SG\..+/gi, 'Chave de API inválida'),
})
