import { Request, Response } from 'express'
import { Send } from 'express-serve-static-core'
import { Query } from 'express-serve-static-core'

export interface ErrorItem {
  message: string,
  field?: string
}

export interface ErrorResponse {
  errors: ErrorItem[]
}

export interface TypedResponse<ResBody> extends Response {
  send: Send<ResBody, this>;
}

export interface TypedRequest<T extends Query, U> extends Request {
  body: U,
  query: T
}