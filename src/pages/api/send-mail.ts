import type { NextApiRequest, NextApiResponse } from 'next'
import sendgrid from '@sendgrid/mail'
import { sendMailHeaders, sendMailScheme } from '@/server/scheme-validation'
import { withValidation } from 'next-validations'
import { z } from 'zod'
import { createRouter } from 'next-connect'
import { ncOptions } from '@/server/next-connect'

type ResponseData = {
  message: string
}

const validateSendMailScheme = withValidation({
  schema: sendMailScheme,
  type: 'Zod',
  mode: 'body',
})

const validateHeadersSendMain = withValidation({
  schema: sendMailHeaders,
  type: 'Zod',
  mode: 'headers',
})

type SendMailSchema = z.infer<typeof sendMailScheme>

const router = createRouter<NextApiRequest, NextApiResponse>()

router
  .use(validateHeadersSendMain())
  .use(validateSendMailScheme())
  .post(async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
    const apiKey = String(req.headers['api-key'])
    const data = req.body as SendMailSchema
    sendgrid.setApiKey(apiKey)

    await sendgrid.send({
      from: { email: data.from },
      personalizations: [
        {
          to: [{ email: data.to }],
          dynamicTemplateData: data.dynamicTemplateData,
        },
      ],
      templateId: data.templateId,
    })

    res.status(200).json({ message: 'E-mail enviado com sucesso.' })
  })

export default router.handler(ncOptions)
