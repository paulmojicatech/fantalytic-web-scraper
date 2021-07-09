import { NFL_DEFAULT_FOOTBALL_PLAYER_STATS } from '../models/fantalytic.const';
import { PositionTypes } from '../models/parser.interface';
import { parserHtmlString } from '../parsers/html-parser.service';

const fetch = require('node-fetch');
const cheerio = require('cheerio');

export async function getSiteContent(position: PositionTypes, year: string): Promise<void> {
    const response = await fetch(NFL_DEFAULT_FOOTBALL_PLAYER_STATS).then((resp: any) => resp.text());
    const $ = cheerio.load(response);
    await parserHtmlString(response, position, year);
    return Promise.resolve();
}