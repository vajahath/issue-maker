export interface IIssueMakerParams {
  // now supports only gitlab
  service: 'gitlab';
  projectId: string | number;
  endPoint: string;
  privateToken: string;
}
