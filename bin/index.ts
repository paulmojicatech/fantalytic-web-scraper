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
  (<string[]>_).findIndex((cmd) => cmd.toLowerCase() === "--help") > -1;
if (isHelpRequest || _.length === 2) {
  logHelp(_);
} else {
  const cmdType = cmdParser.getCommandType(_[2]);
  const position = (<string[]>_).find(cmd => cmd === '--help') as PositionTypes ?? null;
  if (!!cmdType && !!position) {
    switch (cmdType) {
      case RootCommandTypes.GET:
        const siteContentPromise = getSiteContent(position);
        siteContentPromise
          .then(() => {
            logSuccess("Command executed");
          })
          .catch((err) => logError(`Error occurred:${err}`));
        break;
      case RootCommandTypes.UPLOAD:
        try {
          console.log('UPLOAD');
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
