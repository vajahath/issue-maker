import { Request } from 'express';
import { RequestError } from '../error-types/express-request-error';

export function issueIdMaker(req: Request, err: RequestError) {
  return `${process.env.USER || 'unknown-env'}%${req.hostname}%${req.method}%${
    req.originalUrl
  }%${Object.keys(req.query).length ? '(Query)' : ''}%${err.message}%${
    err.details.message
  }`;
}
