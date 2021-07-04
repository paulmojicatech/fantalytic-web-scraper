import { PositionTypes } from "../models/parser.interface";
import { writeFile } from 'fs';
import { parseQBResponse } from "./qb-parser.service";

const cheerio = require('cheerio');

export async function parserHtmlString(html: any, type: PositionTypes, year: string, url: string = ''): Promise<any> {
    
    const $ = cheerio.load(html);
    const table = $('.d3-o-table--detailed');
    switch (type.toUpperCase()) {
        case PositionTypes.QB:
            const qbStats = await parseQBResponse(table, url);
            const outputPath = `${__dirname}/../output/${year}/qb.json`;
            await writeFile(outputPath, JSON.stringify(qbStats), () => {});
            break;
        default:
            break;
    }


    return Promise.resolve();
}