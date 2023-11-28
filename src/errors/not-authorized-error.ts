import { CustomError } from './custom-error'

export class NotAuthorizedError extends CustomError {
  statusCode = 401
  reason = 'Not authorized'

  constructor() {
    super( 'Unauthorized request' )
    Object.setPrototypeOf( this, NotAuthorizedError.prototype )
  }

  serializeErrors() {
    return [ { message: this.reason } ]
  }
}
