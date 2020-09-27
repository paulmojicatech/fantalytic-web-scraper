import { NFL_DEFAULT_FOOTBALL_PLAYER_STATS } from '../models/fantalytic.const';
import { PositionTypes, RootCommandTypes } from '../models/parser.interface';
import { parserHtmlString } from '../parsers/html-parser.service';

const fetch = require('node-fetch');
const cheerio = require('cheerio');
const chalk = require('chalk');

export async function getSiteContent(cmdType: RootCommandTypes, position: PositionTypes): Promise<void> {
    if (cmdType === RootCommandTypes.GET) {
        const response = await fetch(NFL_DEFAULT_FOOTBALL_PLAYER_STATS).then((resp: any) => resp.text());
        const $ = cheerio.load(response);
        await parserHtmlString(response, position);
        return Promise.resolve();
    }
    console.log(chalk.red('Error processing command.'));
    return Promise.resolve();
}