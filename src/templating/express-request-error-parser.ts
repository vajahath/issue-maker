import { Request } from 'express';
import { render as ejsRender } from 'ejs';
import { readFile as _readFile } from 'fs';
import { promisify } from 'bluebird';
import { join as pathJoin } from 'path';
import { v4 } from 'public-ip';

const readFile = promisify(_readFile);

import { issueIdMaker } from './issue-id-maker';

import { ExpressRequestError } from '../error-types/express-request-error';
import { IReportIssueParams } from '../report-issue-params.interface';

export interface IExpressRequestErrorParser {
  labels: string[] | string;
  databaseHost: string;
  databaseName: string;
  resLocals: any;
}

export async function expressRequestErrorParser(
  req: Request,
  err: ExpressRequestError,
  options: IExpressRequestErrorParser,
): Promise<IReportIssueParams> {
  const queryOrParam = Object.keys(req.query).length ? '(Query)' : '';
  return {
    // issue title
    title: `err ${err.statusCode} in ${process.env.USER || 'unknown-env'} in ${
      req.method
    } ${req.originalUrl} ${queryOrParam}`,

    // issue labels
    labels:
      typeof options.labels === 'object'
        ? options.labels.join(',')
        : options.labels || undefined,

    // issue description
    description: await makeDescription(req, err, options),
  };
}

async function makeDescription(
  req: Request,
  err: ExpressRequestError,
  options: IExpressRequestErrorParser,
) {
  const template = (await readFile(
    pathJoin(__dirname, 'default.md'),
  )).toString();

  const mainErrMsg = `${
    typeof err.details === 'string'
      ? err.details
      : err.details.message || err.message
        ? err.details.message || err.message
        : JSON.stringify(err.details, null, 2)
  }`;

  const issueId = issueIdMaker(req, err);

  const description = ejsRender(template, {
    // main
    mainErrMsg,
    issueId,
    // env details
    time: new Date(),
    envUser: process.env.USER || 'n/a',
    nodeEnv: process.env.NODE_ENV || 'n/a',
    nodeConfig: process.env.NODE_CONFIG || 'n/a',
    nodeAppInstance: process.env.NODE_APP_INSTANCE || 'n/a',
    databaseHost: options.databaseHost,
    databaseName: options.databaseName,
    host: await v4(),
    // err details
    requestOrigin: req.hostname,
    requestedUrl: req.originalUrl,
    requestMethod: req.method,
    errDetails: JSON.stringify(
      {
        code: err.statusCode,
        msg: err.message,
        details: err.details,
      },
      null,
      2,
    ),
    resLocals: JSON.stringify(options.resLocals, null, 2),
    reqMethod: req.method,
    reqHeaders: JSON.stringify(req.headers, null, 2),
    reqBody: JSON.stringify(req.body, null, 2),
    reqQuery: JSON.stringify(req.query, null, 2),
    requestIp: `> x-forwarded-for: ${req.headers['x-forwarded-for']} |
    > req.connection.remoteAddress: ${req.connection.remoteAddress} |
    > req.ip: ${req.ip} |`,
  });

  // console.log(description);
  return description;
}
