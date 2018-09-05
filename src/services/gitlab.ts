import * as got from 'got';

import { IReportIssueParams, IService } from '..';

class GitlabService implements IService {
  public async commentOnIssue(
    issueIid: number,
    endPoint: string,
    projectId: string | number,
    privateToken: string,
  ) {
    try {
      await got(
        `${endPoint}/api/v4/projects/${projectId}/issues/${issueIid}/notes?body=happened again`,
        {
          method: 'POST',
          headers: {
            'PRIVATE-TOKEN': privateToken,
          },
        },
      );
    } catch (err) {
      // tslint:disable-next-line:no-console
      console.error('ERROR OCCURRED IN ISSUE-MAKER', err.response.body);
      throw err.response;
    }
  }

  public async reopenIssue(
    issueId: string | number,
    endPoint: string,
    projectId: string | number,
    privateToken: string,
  ) {
    try {
      await got(
        `${endPoint}/api/v4/projects/${projectId}/issues/${issueId}?state_event=reopen`,
        {
          method: 'PUT',
          headers: {
            'PRIVATE-TOKEN': privateToken,
          },
        },
      );
    } catch (err) {
      // tslint:disable-next-line:no-console
      console.error('ERROR OCCURRED IN ISSUE-MAKER', err.response.body);
      throw err.response;
    }
  }

  public async searchForIssue(
    issueMakerId: string,
    endPoint: string,
    projectId: string | number,
    privateToken: string,
  ) {
    try {
      const result = await got(
        `${endPoint}/api/v4/projects/${projectId}/issues?search=${issueMakerId}`,
        {
          method: 'GET',
          headers: {
            'PRIVATE-TOKEN': privateToken,
          },
        },
      );

      if (result.body.length === 1) {
        const res: any = result.body[0];
        return {
          issueId: res.id,
          issueIid: res.iid,
          status: res.status,
        };
      } else {
        return null;
      }
    } catch (err) {
      // tslint:disable-next-line:no-console
      console.error('ERROR OCCURRED IN ISSUE-MAKER', err.response.body);
      throw err.response;
    }
  }

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
