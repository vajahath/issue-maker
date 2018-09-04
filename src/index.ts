import { gitlab } from './gitlab';

export interface IIssueMakerParams {
  // now supports only gitlab
  service: 'gitlab';
  projectId: string | number;
  endPoint: string;
  privateToken: string;
}

export interface IReportIssueParams {
  title: string;
  description?: string;
  confidential?: boolean;
  assignee_ids?: number[];
  milestone_id?: number;
  labels?: string[] | string;
  weight?: number;
}

const defaultReportIssueParams: IReportIssueParams = {
  title: 'untitled',
  description: 'no description provided',
  confidential: false,
  labels: ['by-issue-maker'],
};

export interface IService {
  reportIssue: (
    params: IReportIssueParams,
    endPoint: string,
    projectId: string | number,
    privateToken: string,
  ) => Promise<any>;
}

export class IssueMaker {
  protected service: IService;
  protected endPoint: string;
  protected projectId: string | number;
  protected privateToken: string;

  constructor(params: IIssueMakerParams) {
    if (params.service === 'gitlab') {
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
