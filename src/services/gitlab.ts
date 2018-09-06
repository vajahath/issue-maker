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
            Accept: 'application/json',
          },
        },
      );
    } catch (err) {
      // tslint:disable-next-line:no-console
      console.error('ERROR OCCURRED IN ISSUE-MAKER', err);
      throw err;
    }
  }

  public async reopenIssue(
    issueIid: string | number,
    endPoint: string,
    projectId: string | number,
    privateToken: string,
  ) {
    try {
      await got(
        `${endPoint}/api/v4/projects/${projectId}/issues/${issueIid}?state_event=reopen`,
        {
          method: 'PUT',
          headers: {
            'PRIVATE-TOKEN': privateToken,
            Accept: 'application/json',
          },
        },
      );
    } catch (err) {
      // tslint:disable-next-line:no-console
      console.error('ERROR OCCURRED IN ISSUE-MAKER', err);
      throw err;
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
            Accept: 'application/json',
          },
        },
      );

      if (!result.body) {
        return null;
      }

      const body: any[] = JSON.parse(result.body);

      if (body.length === 1) {
        const res: any = body[0];
        return {
          issueId: res.id,
          issueIid: res.iid,
          state: res.state,
        };
      } else {
        return null;
      }
    } catch (err) {
      // tslint:disable-next-line:no-console
      console.error('ERROR OCCURRED IN ISSUE-MAKER', err);
      throw err;
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
          Accept: 'application/json',
        },
        json: true,
        body: params,
      });
    } catch (err) {
      // tslint:disable-next-line:no-console
      console.error('ERROR OCCURRED IN ISSUE-MAKER', err);
      throw err;
    }
  }
}

export const gitlab = new GitlabService();
