#!/usr/bin/env node

import { getSiteContent } from "../http/http.service";
import { CommandParser } from "../parsers/command-parser.service";
import { logSuccess } from "../messaging/success.service";
import { logError } from "../messaging/error.service";
import { logHelp } from "../parsers/help.parser";

const minimist = require("minimist");

const cmdParser = new CommandParser();

const args = minimist(process.argv);
const { _ } = args;

const isHelpRequest =
  (<string[]>_).findIndex((cmd) => cmd.toLowerCase() === "--help") > -1;
if (isHelpRequest || _.length === 2) {
  logHelp(_);
} else {
  const cmdType = cmdParser.getCommandType(_[2]);
  const position = cmdParser.getCommandPostion(_[3]);
  if (!!cmdType && !!position) {
    const siteContentPromise = getSiteContent(cmdType, position);
    siteContentPromise
      .then(() => {
        logSuccess("Command executed");
      })
      .catch((err) => logError(`Error occurred:${err}`));
  } else {
    logError("Unknown command");
  }
}
