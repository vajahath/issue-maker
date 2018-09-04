export interface IReportIssueParams {
  title: string;
  description?: string;
  confidential?: boolean;
  assignee_ids?: number[];
  milestone_id?: number;
  labels?: string[] | string;
  weight?: number;
}
