import { IReportIssueParams } from './report-issue-params.interface';

export interface IService {
  reportIssue: (
    params: IReportIssueParams,
    endPoint: string,
    projectId: string | number,
    privateToken: string,
  ) => Promise<any>;
}
