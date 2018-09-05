import * as serializeError from 'serialize-error';

export enum RequestErrorType {
  'NOT_FOUND',
  'UNPROCESSABLE_ENTITY',
  'LOGIN_FAILED',
  'INTERNAL_SERVER_ERROR',
  'CUSTOM',
  'BAD_REQUEST',
  'CONFLICT',
  'FORBIDDEN',
}

export const ERROR_DEFINITIONS = {
  [RequestErrorType.NOT_FOUND]: {
    statusCode: 404,
    message: 'The requested resource is not found on server',
  },
  [RequestErrorType.UNPROCESSABLE_ENTITY]: {
    statusCode: 422,
    message: 'Validation err',
  },
  [RequestErrorType.LOGIN_FAILED]: {
    statusCode: 401,
    message: 'Invalid credentials',
  },
  [RequestErrorType.INTERNAL_SERVER_ERROR]: {
    statusCode: 500,
    message:
      'Internal server fault, Something went wrong while trying to process your request',
  },
  [RequestErrorType.CUSTOM]: {
    statusCode: 500,
    message: 'Unexpected err',
  },
  [RequestErrorType.BAD_REQUEST]: {
    statusCode: 400,
    message: 'Bad Request',
  },
  [RequestErrorType.CONFLICT]: {
    statusCode: 409,
    message:
      'The request could not be completed due to a conflict with the current state of the target resource',
  },
  [RequestErrorType.FORBIDDEN]: {
    statusCode: 403,
    message: 'The server understood the request but refuses to authorize it.',
  },
};

export class RequestError {
  public err: string;
  public statusCode: number;
  public message: string;
  public details: any;

  private errType: RequestErrorType;

  constructor(
    errorType: RequestErrorType,
    details?: any,
    statusCode?: number,
    message?: string,
  ) {
    // for accessing member functions
    this.errType = errorType;

    this.err = RequestErrorType[errorType];
    this.statusCode = statusCode || this.getStatusCode();
    this.message = message || this.getMessage();
    this.details = serializeError(details);
  }

  private getStatusCode() {
    return ERROR_DEFINITIONS[this.errType].statusCode;
  }

  private getMessage() {
    return ERROR_DEFINITIONS[this.errType].message;
  }
}
