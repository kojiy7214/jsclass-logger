const fs = require("fs");

/**
 * Logger class.
 */
class Logger {
  constructor() {}

  static dataFormatter(date, format) {
    return format.replace(/YYYY/, date.getFullYear()).
    replace(/MM/, new Array(2 - (date.getMonth() + 1).toString().length + 1).join('0') + (date.getMonth() + 1)).
    replace(/DD/, new Array(2 - date.getDate().toString().length + 1).join('0') + date.getDate()).
    replace(/hh/, new Array(2 - date.getHours().toString().length + 1).join('0') + date.getHours()).
    replace(/mm/, new Array(2 - date.getMinutes().toString().length + 1).join('0') + date.getMinutes()).
    replace(/ss/, new Array(2 - date.getSeconds().toString().length + 1).join('0') + date.getSeconds()).
    replace(/zzz/, new Array(3 - date.getMilliseconds().toString().length + 1).join('0') + date.getMilliseconds());
  }

  static indent(str) {
    str = str.replace(/^(?=.)/gm, new Array(2).join('  '));
    return str;
  }

  static getFile() {
    let outDir = Logger.outDir || "./log/";

    //check dir existance
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir);
    }

    //get the latest file under dir
    //get file list & find the latest log file
    let logfile;
    let files = fs.readdirSync(outDir);
    files.sort();
    logfile = files[files.length - 1];

    //check if new file should be created
    if (!logfile || (logfile && Logger.rotate && Logger.rotate(outDir + logfile))) {
      let newlogfile = Logger.dataFormatter(new Date(), "YYYYMMDDhhmmsszzz.log");
      files.push(newlogfile);
      logfile = newlogfile;
    }

    //check fot generation
    if (files.length > Logger.generation) {
      for (let i = 0; i < files.length - Logger.generation; i++) {
        fs.unlink(outDir + files[i], (error) => {});
      }
    }

    return outDir + logfile;
  };

  static resolveMsg(msg) {
    let type = typeof msg;

    if (msg !== null && type === "object") {
      let json = JSON.stringify(msg, null, 2);
      json = Logger.indent(json);
      msg = "*** OBJECT DUMP ***\n  " + msg.constructor.name + json;
    } else if (type === "function") {
      msg = "*** FUNCTION DUMP ***\n  " + msg.toString();
    }

    return msg;
  }

  log(prefix, msg) {
    msg = Logger.resolveMsg(msg);
    let timestamp = Logger.dataFormatter(new Date(), Logger.ts);
    let lineinfo = Logger.getLineInfo() + " ";

    let log_content = timestamp + prefix + lineinfo + msg + "\n";
    if (Logger.toFile) {
      let file = Logger.getFile();
      fs.appendFileSync(file, log_content, "utf8", (error) => {});
    } else {
      console.log(log_content);
    }
  }

  /**
   * Output log at DEBUG level, which is a debug level.
   * @method trace
   * @param  {any} msg Log message.
   * @instance
   * @memberof Logger
   */
  debug(msg) {
    if (Logger.debug) {
      this.log(" DEBUG ", msg);
    }
  }

  /**
   * Output log at INFO level, which is a production level.
   * @method trace
   * @param  {any} msg Log message.
   * @instance
   * @memberof Logger
   */
  info(msg) {
    this.log(" INFO  ", msg);
  }

  /**
   * Output log at WARN level, which is a production level.
   * @method trace
   * @param  {any} msg Log message.
   * @instance
   * @memberof Logger
   */
  warn(msg) {
    this.log(" WARN  ", msg);
  }

  static getStackTrace() {
    let stack = {};
    Error.captureStackTrace(stack);
    let stacktrace = stack.stack;
    let lines = stacktrace.split('\n');
    lines.splice(0, 3);
    stacktrace = lines.join('\n');

    return stacktrace;
  }

  static getLineInfo() {
    let stack = {};
    Error.captureStackTrace(stack);
    let stacktrace = stack.stack;
    let lines = stacktrace.split('\n');
    lines.splice(0, 4);

    let firstline = lines[0];
    let index = firstline.lastIndexOf("/");
    return "(" + firstline.substr(index + 1);
  }

  /**
   * Output log at TRACE level, which is a debug level.
   * @method trace
   * @param  {any} msg Log message.
   * @instance
   * @memberof Logger
   */
  trace(msg) {
    msg = Logger.resolveMsg(msg);
    let stacktrace = Logger.getStackTrace();
    msg = msg + "\n" + stacktrace;
    this.log(" TRACE ", msg);
  }

  /**
   * Output log at ERROR level, which is a production level.
   * @method error
   * @param  {any} msg Log message.
   * @instance
   * @memberof Logger
   */
  error(msg) {
    msg = Logger.resolveMsg(msg);
    let stacktrace = Logger.getStackTrace();
    msg = msg + "\n" + stacktrace;
    this.log(" ERROR ", msg);
  }
}

/**
 * Get logger instance. supprted options are as below.<br>
 * -debug: true / false
 * -toFile: true / false
 * -outDir: directory to output log file, by default it is "./log/"
 * -rotate: function to check when to rotate log file, should return true / false.
 * -generation: log files to keep on disk
 * -ts: timestamp format in YYYYMMDDhhmmsszzz format
 *
 * @method getLogger
 * @param  {option}  desc Logger option.
 * @return {Logger}       Logger instance
 */
function getLogger(desc) {
  Logger.debug = desc.debug || Logger.debug;
  Logger.toFile = desc.toFile || Logger.toFile;
  Logger.outDir = desc.outDir || Logger.outDir;
  Logger.rotate = desc.rotate || Logger.rotate;
  Logger.generation = desc.generation || Logger.generation;
  Logger.ts = desc.ts || Logger.ts || "YYYY-MM-DD hh:mm:ss.zzz";

  return new Logger();
}

/**
 * Simple and easy to use logger.
 * @module jsclass-logger
 */
module.exports = getLogger;