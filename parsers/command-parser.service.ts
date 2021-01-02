import { PositionTypes, RootCommandTypes } from "../models/parser.interface";

export class CommandParser {
    constructor() { }

    getCommandType(type: string): RootCommandTypes | null {
        if (!!type) {
            switch (type.toLowerCase()) {
                case 'get':
                    return RootCommandTypes.GET;
                case 'upload':
                    return RootCommandTypes.UPLOAD;
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