:eye: This issue is created by [issue-maker](https://www.npmjs.com/package/issue-maker) lib.
<br>:id: **Issue Identifier:**
```
<%- issueId %>
```
:scissors: _Tip: remove the Issue Identifier to detach this issue from future manipulations by issue-maker lib_

---

## :crab: Error Message

<%- mainErrMsg %>

## :cactus: Env Details

| **property**      | **value**                |
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

## :squid: Error Details

| **property**                 | **value**                           |
| ---------------------------- | ----------------------------------- |
| request origin               | `<%- requestOrigin %>`              |
| requested url                | `<%- requestedUrl %>`               |
| request method               | `<%- requestMethod %>`              |
| x-forwarded-for header       | `<%- xForwardedFor %>`              |
| req.connection.remoteAddress | `<%- reqConnectionRemoteAddress %>` |
| req.ip                       | `<%- reqIp %>`                      |

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

---

[issue-maker](https://www.npmjs.com/package/issue-maker) loves you :cupid: