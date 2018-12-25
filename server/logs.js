var conflog={
    "appenders":
    {
      "console":{
        "type":"console",
        level:'ALL'
      },
      "error":{
        "type": "file",
        "filename": "/logs/error.log",
        "maxLogSize": 104800,
        "backups": 100,
        level:'ERROR'
      },
      "debug":{
        "type": "file",
        "filename": "/logs/debug.log",
        "maxLogSize": 104800,
        "backups": 100,
        level:'DEBUG'
      }
    },
    "replaceConsole": true,
    "categories":{
      default:{
        appenders:['error'],
        level:'ERROR'
      }
    }
  }

  const log4js = require("log4js");
    log4js.configure(conflog);


module.exports={
  error:log4js.connectLogger(log4js.getLogger('error')),
  debug:log4js.connectLogger(log4js.getLogger('debug')),
};