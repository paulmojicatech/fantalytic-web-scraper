const fetch = require('node-fetch');
const cheerio = require('cheerio');

export async function getSiteContent(): Promise<any> {
    const response = await fetch('https://nfl.com/stats/player-stats').then((resp: any) => resp.text());
    const $ = cheerio.load(response);
    const table = $('.d3-o-table--detailed');
    return Promise.resolve(table.html());
}