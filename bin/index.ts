#!/usr/bin/env node

import { getSiteContent } from "../http/http.service";
import { CommandParser } from "../parsers/command-parser.service";
import { logSuccess } from "../messaging/success.service";
import { logError } from "../messaging/error.service";
import { logHelp } from "../parsers/help.parser";
import { PositionTypes, RootCommandTypes } from "../models/parser.interface";
import { MongoDbAdapter } from "../data-persistence-adapters/mongo-adapter";

const minimist = require("minimist");
require('dotenv').config();

const cmdParser = new CommandParser();

const args = minimist(process.argv);
const { _ } = args;

const isHelpRequest =
  (<string[]>_).findIndex((cmd) => `${cmd}`.toLowerCase() === "--help") > -1;
if (isHelpRequest || _.length === 2) {
  logHelp(_);
} else {
  let cmd = null;
  try {
    cmd = cmdParser.getCommand(_);
  } catch (exception) {
    logError(`${exception}`);
  }
  const position = cmd?.pos as PositionTypes ?? null;
  if (!!cmd && !!position) {
    switch (cmd.type) {
      case RootCommandTypes.GET:
        const siteContentPromise = getSiteContent(position, cmd.year);
        siteContentPromise
          .then(() => {
            logSuccess("Command executed");
          })
          .catch((err) => logError(`Error occurred:${err}`));
        break;
      case RootCommandTypes.UPLOAD:
        try {
          const mongoSvc = new MongoDbAdapter();
          mongoSvc.getCollection(`${position}`).then((items) => {
            logSuccess(`${JSON.stringify(items)} `);
          }).catch(err => {
            throw err;
          });
        } catch (ex: any) {
          logError(`UPLOAD COMMAND FAILED: ${ex}`);
        } finally {
          break;
        }
      default:
        break;
    }
  } else {
    logError("Unknown command");
  }
}
