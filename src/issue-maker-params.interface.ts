export interface IIssueMakerParams {
  // now supports only gitlab
  service: 'gitlab';
  projectId: string | number;
  endPoint: string;
  privateToken: string;
  // db details
  labels?: 'string'; // label already created
  resLocals?: any; // for showing in issue description.
  databaseHost?: string; // for showing in issue description.
  databaseName?: string; // for showing in issue description.
}
