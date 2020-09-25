#!/usr/bin/env node

import { getSiteContent } from '../http/http.service';
import { CommandParser } from '../parsers/command-parser.service';
import { writeFile } from 'fs';

const minimist = require('minimist');
const path = require('path');

const cmdParser = new CommandParser();

const args = minimist(process.argv);
const { _ } = args;
const cmdType = cmdParser.getCommandType(_[2]);
const parseCmdPromise = cmdParser.parseCommand(cmdType);
const siteContentPromise = getSiteContent();
Promise.all([parseCmdPromise, siteContentPromise]).then(async (res) => {
    const [ cmd, content ] = res;
    const rootDir = `${__dirname + '/../output/'}`;
    //await writeFile(`${rootDir}qb.html`, content, () => {});
    //console.log('PATH', path.normalize(rootDir));
});
