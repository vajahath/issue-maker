> This issue is created by [issue-maker](https://www.npmjs.com/package/issue-maker) lib.<br>**Issue Identifier:** `<%- issueId %>`<br>_Tip: remove the Issue Identifier to detach this issue from future manipulations by issue-maker lib_

## Error Message

<%- mainErrMsg %>

## Env Details

| prop              | value                    |
| ----------------- | ------------------------ |
| time              | `<%- time %>`            |
| ENV_USER          | `<%- envUser %>`         |
| host              | `<%- host %>`            |
| NODE_ENV          | `<%- nodeEnv %>`         |
| NODE_APP_INSTANCE | `<%- nodeAppInstance %>` |
| database Name     | `<%- databaseName %>`    |

#### NODE_CONFIG

```
<%- nodeConfig %>
```

#### Database Host

```
<%- databaseHost %>
```

## Error Details

| prop           | value                  |
| -------------- | ---------------------- |
| request origin | `<%- requestOrigin %>` |
| requested url  | `<%- requestedUrl %>`  |
| request method | `<%- requestMethod %>` |
| req ip         | `<%- requestIp %>`     |

#### error details

```
<%- errDetails %>
```

#### req.headers

```
<%- reqHeaders %>
```

#### req.body

```
<%- reqBody %>
```

#### req.query

```
<%- reqQuery %>
```

#### res.locals

```
<%- resLocals %>
```

> Reported by [issue-maker](https://www.npmjs.com/package/issue-maker) lib