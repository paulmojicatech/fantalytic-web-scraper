import { PositionTypes, RootCommandTypes } from '../models/parser.interface';
import { parserHtmlString } from '../parsers/html-parser.service';

const fetch = require('node-fetch');
const cheerio = require('cheerio');

export async function getSiteContent(position: PositionTypes): Promise<string> {
    const response = await fetch('https://nfl.com/stats/player-stats').then((resp: any) => resp.text());
    const $ = cheerio.load(response);
    const table = $('.d3-o-table--detailed');
    await parserHtmlString(response, position);
    return Promise.resolve(table.html());
}