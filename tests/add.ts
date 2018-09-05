// tslint:disable:no-console
import { IssueMaker } from '../src';

const gitlab = new IssueMaker({
  service: 'gitlab',
  endPoint: 'http://117.247.186.100:9898',
  privateToken: 'QtHVSf1hvAeCqd6Bu7-X',
  projectId: 938,
});

gitlab
  .reportIssue({
    title: 'testing from issue-maker',
  })
  .then(() => console.log('issue-reported'))
  .catch(err => console.log(err));
