import { Request } from 'express';
import { ExpressRequestError } from '../error-types/express-request-error';

export function issueIdMaker(req: Request, err: ExpressRequestError) {
  return `${process.env.USER || 'unknown-env'}-${req.hostname}-${req.method}-${
    req.originalUrl
  }-${Object.keys(req.query).length ? '(Query)' : ''}-${err.message}-${
    err.details.message
  }`
    .split('/')
    .join('_')
    .split(' ')
    .join('')
    .toLowerCase();
}
