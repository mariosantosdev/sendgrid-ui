import { NextApiRequest, NextApiResponse } from 'next'
import { HandlerOptions } from 'next-connect'
import ApiError, { handleApiError } from './errors'
import { RequestHandler } from 'next-connect/dist/types/node'

export const ncOptions: HandlerOptions<
  RequestHandler<NextApiRequest, NextApiResponse>
> = {
  onError(error, req: NextApiRequest, res: NextApiResponse) {
    handleApiError(error, req, res)
  },
  onNoMatch(req: NextApiRequest, res: NextApiResponse) {
    const error = new ApiError(`Method '${req.method}' not allowed`, 405)
    handleApiError(error, req, res)
  },
}
