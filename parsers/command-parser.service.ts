import { PositionTypes, RootCommandTypes } from "../models/parser.interface";

const chalk = require('chalk');

export class CommandParser {
    constructor() { }

    getCommandType(type: string): RootCommandTypes {
        switch (type.toLowerCase()) {
            case 'get':
                return RootCommandTypes.GET
            default:
                return RootCommandTypes.UNKNOWN;
                
        }
    }

    getCommandPostion(type: string): PositionTypes {
        switch (type.toLowerCase()) {
            case 'qb':
                return PositionTypes.QB;
            default:
                return PositionTypes.UNKNOWN;
        }
    }
}