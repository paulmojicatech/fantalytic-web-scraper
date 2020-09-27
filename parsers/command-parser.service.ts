import { PositionTypes, RootCommandTypes } from "../models/parser.interface";

const chalk = require('chalk');

export class CommandParser {
    constructor() { }

    getCommandType(type: string): RootCommandTypes | null {
        if (!!type) {
            switch (type.toLowerCase()) {
                case 'get':
                    return RootCommandTypes.GET
                default:
                    return RootCommandTypes.UNKNOWN;
                    
            }
        } 
        return null;
    }

    getCommandPostion(type: string): PositionTypes | null {
        if (!!type) {
            switch (type.toLowerCase()) {
                case 'qb':
                    return PositionTypes.QB;
                default:
                    return PositionTypes.UNKNOWN;
            }
        }
        return null;
    }
    
}