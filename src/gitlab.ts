import { IService, IReportIssueParams } from '.';
import * as got from 'got';

class GitlabService implements IService {
  public async reportIssue(
    params: IReportIssueParams,
    endPoint: string,
    projectId: string | number,
    privateToken: string,
  ) {
    try {
      // concat labels
      if (typeof params.labels === 'object') {
        params.labels = params.labels.join(',');
      }

      await got(`${endPoint}/api/v4/projects/${projectId}/issues`, {
        method: 'POST',
        headers: {
          'PRIVATE-TOKEN': privateToken,
        },
        json: true,
        body: params,
      });
    } catch (err) {
      // tslint:disable-next-line:no-console
      console.error('ERROR OCCURRED IN ISSUE-MAKER', err.response.body);
      throw err.response;
    }
  }
}

export const gitlab = new GitlabService();
