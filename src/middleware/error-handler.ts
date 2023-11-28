import { NextFunction, Request } from 'express'
import { CustomError } from '../errors/custom-error'
import { ErrorResponse, TypedResponse } from '../types'

export const errorHandler = (
    err: Error,
    _req: Request,
    res: TypedResponse<ErrorResponse>,
    _next: NextFunction
) => {
  if ( err instanceof CustomError ) {
    return res.status( err.statusCode ).send( { errors: err.serializeErrors() } )
  }

  res.status( 400 ).send( {
    errors: [ { message: 'Something went wrong' } ]
  } )
}