import { parserHtmlString } from '../parsers/html-parser.service';

const fetch = require('node-fetch');
const cheerio = require('cheerio');

export async function getSiteContent(): Promise<string> {
    const response = await fetch('https://nfl.com/stats/player-stats').then((resp: any) => resp.text());
    const $ = cheerio.load(response);
    const table = $('.d3-o-table--detailed');
    await parserHtmlString(response);
    return Promise.resolve(table.html());
}