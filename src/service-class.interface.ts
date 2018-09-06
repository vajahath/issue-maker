import { IReportIssueParams } from './report-issue-params.interface';

export interface IService {
  reportIssue: (
    params: IReportIssueParams,
    endPoint: string,
    projectId: string | number,
    privateToken: string,
  ) => Promise<any>;

  searchForIssue: (
    issueMakerId: string,
    endPoint: string,
    projectId: string | number,
    privateToken: string,
  ) => Promise<null | {
    issueIid: number;
    issueId: number;
    state: 'opened' | 'closed';
  }>;

  reopenIssue: (
    issueId: string | number,
    endPoint: string,
    projectId: string | number,
    privateToken: string,
  ) => Promise<any>;

  commentOnIssue: (
    issueIid: number,
    endPoint: string,
    projectId: string | number,
    privateToken: string,
  ) => Promise<any>;
}
