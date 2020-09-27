#!/usr/bin/env node

import { getSiteContent } from '../http/http.service';
import { CommandParser } from '../parsers/command-parser.service';

const minimist = require('minimist');
const chalk = require('chalk');

const cmdParser = new CommandParser();

const args = minimist(process.argv);
const { _ } = args;
const cmdType = cmdParser.getCommandType(_[2]);
const position = cmdParser.getCommandPostion(_[3]);
if (!!cmdType && !!position) {
    const siteContentPromise = getSiteContent(cmdType, position);
    siteContentPromise
        .then(() => {
            console.log(chalk.green('Command was successfully proecessed.'));
        })
        .catch(err => console.log(chalk.red(`Error occurred:${err}`)));
    
}
