// tslint:disable:no-console
/**
 * interfaces
 */
import { Request } from 'express';

import { IIssueMakerParams } from './issue-maker-params.interface';
import { IReportIssueParams } from './report-issue-params.interface';
import { IService } from './service-class.interface';
import { RequestError } from './error-types/express-request-error';
import {
  expressRequestErrorParser,
  IExpressRequestErrorParser,
} from './templating/express-request-error-parser';

// defaults
import { defaultReportIssueParams } from './default-report-issue-params';

import { issueIdMaker } from './templating/issue-id-maker';
/**
 * for conveniently importing by client libs
 */
export { IIssueMakerParams, IReportIssueParams, IService };

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
    err: RequestError,
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
      return;
    }

    console.log('searchResult.status', searchResult.state);
    // if one exists(closed), reopen it and comment on it
    if (searchResult.state === 'closed') {
      await this.service.reopenIssue(
        searchResult.issueIid,
        this.endPoint,
        this.projectId,
        this.privateToken,
      );
    }

    await this.service.commentOnIssue(
      searchResult.issueIid,
      this.endPoint,
      this.projectId,
      this.privateToken,
    );
  }
}
