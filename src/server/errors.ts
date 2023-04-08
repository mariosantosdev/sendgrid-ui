import { NextApiRequest, NextApiResponse } from 'next'
import { ZodError } from 'zod'

export default class ApiError extends Error {
  public readonly statusCode: number

  constructor(message: string, statusCode: number) {
    super(message)

    this.statusCode = statusCode

    Error.captureStackTrace(this, this.constructor)
  }

  static fromZodError(error: ZodError): ApiError {
    return new this(error.toString(), 400)
  }
}

export const handleApiError = (
  error: any,
  _req: NextApiRequest,
  res: NextApiResponse,
) => {
  const response = {
    message: error.message,
    statusCode: error.statusCode,
  }

  res.status(error.statusCode || 500).json(response)
}
