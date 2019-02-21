import * as serializeError from 'serialize-error';
import { IssueMaker } from '../';
import { Request } from 'express';

export enum ExpressRequestErrorType {
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
  [ExpressRequestErrorType.NOT_FOUND]: {
    statusCode: 404,
    message: 'The requested resource is not found on server',
  },
  [ExpressRequestErrorType.UNPROCESSABLE_ENTITY]: {
    statusCode: 422,
    message: 'Validation err',
  },
  [ExpressRequestErrorType.LOGIN_FAILED]: {
    statusCode: 401,
    message: 'Invalid credentials',
  },
  [ExpressRequestErrorType.INTERNAL_SERVER_ERROR]: {
    statusCode: 500,
    message:
      'Internal server fault, Something went wrong while trying to process your request',
  },
  [ExpressRequestErrorType.CUSTOM]: {
    statusCode: 500,
    message: 'Unexpected err',
  },
  [ExpressRequestErrorType.BAD_REQUEST]: {
    statusCode: 400,
    message: 'Bad Request',
  },
  [ExpressRequestErrorType.CONFLICT]: {
    statusCode: 409,
    message:
      'The request could not be completed due to a conflict with the current state of the target resource',
  },
  [ExpressRequestErrorType.FORBIDDEN]: {
    statusCode: 403,
    message: 'The server understood the request but refuses to authorize it.',
  },
};

export class ExpressRequestError {
  public err: string;
  public statusCode: number;
  public message: string;
  public details: any;
  public reported: boolean;

  private errType: ExpressRequestErrorType;
  private expressIssueReporter: {
    reporter: IssueMaker;
    req: Request;
  };

  constructor(
    errorType: ExpressRequestErrorType,
    details?: any,
    statusCode?: number,
    message?: string,
    expressIssueReporter?: {
      reporter: IssueMaker;
      req: Request;
    },
  ) {
    // for accessing member functions
    this.errType = errorType;

    this.err = ExpressRequestErrorType[errorType];
    this.statusCode = statusCode || this.getStatusCode();
    this.message = message || this.getMessage();
    this.details = serializeError(details);

    if (expressIssueReporter) {
      this.expressIssueReporter = expressIssueReporter;
      this.reportIssue();
      this.reported = true;
    } else {
      this.reported = false;
    }
  }

  private getStatusCode() {
    return ERROR_DEFINITIONS[this.errType].statusCode;
  }

  private getMessage() {
    return ERROR_DEFINITIONS[this.errType].message;
  }

  private reportIssue() {
    // this.expressIssueReporterValidation();
    this.expressIssueReporter.reporter.expressReportError(
      this.expressIssueReporter.req,
      this,
    );
  }

  // private expressIssueReporterValidation() {}
}
