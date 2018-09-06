/**
 * interfaces
 */
import { Request } from 'express';

import { IIssueMakerParams } from './issue-maker-params.interface';
import { IReportIssueParams } from './report-issue-params.interface';
import { IService } from './service-class.interface';
import * as log from 'fancy-log';
import * as chalk from 'chalk';

import {
  expressRequestErrorParser,
  IExpressRequestErrorParser,
} from './templating/express-request-error-parser';

// defaults
import { defaultReportIssueParams } from './default-report-issue-params';

import { issueIdMaker } from './templating/issue-id-maker';
import {
  ExpressRequestError,
  ExpressRequestErrorType,
  ERROR_DEFINITIONS,
} from './error-types/express-request-error';
/**
 * for conveniently importing by client libs
 */
export {
  IIssueMakerParams,
  IReportIssueParams,
  IService,
  ExpressRequestError,
  ExpressRequestErrorType,
  ERROR_DEFINITIONS,
};

/**
 * main class
 */
export class IssueMaker {
  private service: IService;
  private endPoint: string;
  private projectId: string | number;
  private privateToken: string;

  constructor(params: IIssueMakerParams) {
    // selectively import
    if (params.service === 'gitlab') {
      const { gitlab } = require('./services');
      this.service = gitlab;
    }
    this.endPoint = params.endPoint;
    this.projectId = params.projectId;
    this.privateToken = params.privateToken;
  }

  public async reportIssue(params: IReportIssueParams) {
    const completeParams = Object.assign({}, defaultReportIssueParams, params);

    await this.service.reportIssue(
      completeParams,
      this.endPoint,
      this.projectId,
      this.privateToken,
    );
  }

  public async expressReportError(
    req: Request,
    err: ExpressRequestError,
    options: IExpressRequestErrorParser,
  ) {
    const issueMakerId = issueIdMaker(req, err);

    // search for issue
    const searchResult = await this.service.searchForIssue(
      issueMakerId,
      this.endPoint,
      this.projectId,
      this.privateToken,
    );

    // if no such issues, create one
    if (!searchResult) {
      await this.reportIssue(
        await expressRequestErrorParser(req, err, options),
      );
      log(chalk.red('[issue-maker]') + ' issue reported');
      return;
    }

    // if one exists(closed), reopen it and comment on it
    if (searchResult.state === 'closed') {
      await this.service.reopenIssue(
        searchResult.issueIid,
        this.endPoint,
        this.projectId,
        this.privateToken,
      );
      log(
        chalk.red('[issue-maker]') + ' reopened already reported closed issue',
      );
    }

    await this.service.commentOnIssue(
      searchResult.issueIid,
      this.endPoint,
      this.projectId,
      this.privateToken,
    );
    log(chalk.red('[issue-maker]') + ' commented on issue');
  }
}
