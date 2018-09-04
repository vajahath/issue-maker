/**
 * interfaces
 */
import { IIssueMakerParams } from './issue-maker-params.interface';
import { IReportIssueParams } from './report-issue-params.interface';
import { IService } from './service-class.interface';

// defaults
import { defaultReportIssueParams } from './default-report-issue-params';

/**
 * services
 */
// import { gitlab } from './services';

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
}
