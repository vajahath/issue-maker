# issue-maker
No, this will not be an issue maker. I promise.

[![npm](https://img.shields.io/npm/v/issue-maker.svg)](https://www.npmjs.com/package/issue-maker)
[![Travis](https://img.shields.io/travis/vajahath/issue-maker.svg)](https://travis-ci.org/vajahath/issue-maker)
[![styled with prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Built with generator-ts-np](https://img.shields.io/badge/scaffolding-ts_np-2699ad.svg)](https://github.com/vajahath/generator-ts-np)
[![npm](https://img.shields.io/npm/dt/issue-maker.svg)](https://www.npmjs.com/package/issue-maker)

![inbox](media/logo.png)

## What

Helps you to report issues to issue trackers like github or gitlab. Currently gitlab is the only supported service. You can improve this package to add multiple services like github/trello/jira etc.

## Install

```bash
npm i --save issue-maker
```

[![](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

You don't have to install type definitions for typescript. It's built in.

### How it works

At present only gitlab is supported. This package access [gitlab apis(v4)](https://docs.gitlab.com/ce/api/) behind the scenes.

The real use comes [when used with express](#for-applications-running-in-express)

## Normal Usage

```ts
import { IssueMaker } from 'issue-maker';
// or
const { IssueMaker } = require('issue-maker');
```

create an issue maker

```ts
const gitlab = new IssueMaker({
  service: 'gitlab', // only this service is supported now
  endPoint: 'https://gitlab.com_or_your_custom', // note: no defaults set. you've to provide this
  privateToken: 'XXXX', // can be created from profile/settings page
  projectId: 888, // gotten from project settings page
});
```

report a simple issue like

```ts
gitlab.reportIssue({
  title: '(required) this will be issue title',
  description: '(optional) markdown **supported issue description**',
  /**
   * labels: coma separated string OR array of labels.
   * all labels should be pre-created in the service. else fails.
   * (optional)
   **/
  labels: 'by-issue-maker',
  assignee_ids: [454], // optional
  milestone_id: 56, // optional
})
  .then(()=>console.log('issue-reported'))
  .catch(err=>console.log('err occurred', err));
```

## For applications running in [express](https://expressjs.com)

Issue maker leverages its full superpower when used with express.

### Features

* Easily create an issue
* Issue-maker comments on the same issue if the issue happens again. Will not create a new issue.
* If a closed issue is again occurred, issue-maker reopen the issue and comments on it.

### How

You need a common error format for this to work. Import that error class

```ts
import {
  IssueMaker, // the original class
  ExpressRequestError, // error class. all errors will be of this format.
  ExpressRequestErrorType, // select the type of error you have to throw
} from 'issue-maker';
```

below is a sample route in which you throw an error in express.

```ts
app.get('/send/cats/to/me/with/500', (req, res, next) =>
  next(
    new ExpressRequestError( // use the err class
      ExpressRequestErrorType.INTERNAL_SERVER_ERROR, // choose err type
      new Error('testing 500 with cats api'), // put err details. (string format is also supported)
    ),
  ),
);
```

your common err handler looks like: _(here is where you call the issue-maker)_

```ts
// in the end
app.use(requestErrHandler);

function requestErrHandler(err, req, res, next){
  if (err.statusCode >= 500 && err instanceof ExpressRequestError) {
    gitlabIssue.expressReportError(req, err, {
      labels: 'by-issue-maker', // label already created
      resLocals: res.locals, // for showing in issue description.
      databaseHost: '<host>', // for showing in issue description.
      databaseName: '<name>', // for showing in issue description.
    })
      .then(()=>console.log('issue reported'))
      .catch(err=>console.log('err', err))
  }
  /**
   * rest of the code..
   * handle err or
   * res.status(err.statusCode).send({msg:'oops'})
   **/ 
}
```


---

Version of [ts-np-generator](https://github.com/vajahath/generator-ts-np) used: [![used version of ts-np generator](https://img.shields.io/badge/ts--np-v2.0.5-a5a5a5.svg?style=flat-square)](https://github.com/vajahath/generator-ts-np)

## Licence

MIT &copy; [Vajahath Ahmed](https://twitter.com/vajahath7)
