import { PositionTypes } from "../models/parser.interface";
import { writeFileSync } from 'fs';
import { parseQBResponse } from "./qb-parser.service";
import { logError } from "../messaging/error.service";

const cheerio = require('cheerio');

export async function parserHtmlString(html: any, type: PositionTypes, year: string, url: string = ''): Promise<any> {
    
    switch (type.toUpperCase()) {
        case PositionTypes.QB:
            const qbStats = await parseQBResponse(html, url);
            const outputPath = `${__dirname}/../output/${year}_qb.json`;
            try {
                await writeFileSync(outputPath, JSON.stringify(qbStats));
            } catch (ex) {
                logError(`${ex}`);
            }
            break;
        default:
            break;
    }


    return Promise.resolve();
}