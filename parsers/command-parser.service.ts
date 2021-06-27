import { FantalyticCommand } from "../models";
import { GetLocationType, IFantalyticGetCommand, PositionTypes, RootCommandTypes } from "../models/parser.interface";

export class CommandParser {
    constructor() { }

    getCommand(args: string[]): FantalyticCommand | null {
        const type = args[2] as RootCommandTypes;
        if (!!type) {
            switch (type.toLowerCase()) {
                case RootCommandTypes.GET:
                    let command = this.parseOptions(type, args) as IFantalyticGetCommand;
                    command = {
                        ...command,
                        type: RootCommandTypes.GET,
                        pos: args[3] as PositionTypes
                    };
                    return command;
                default:
                    return null;
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

    private parseOptions(cmdType: RootCommandTypes, options: string[]): FantalyticCommand | null {
        switch (cmdType) {
            case RootCommandTypes.GET:
                let getCommand: any = {};
                options.forEach((opt, index) => {
                    switch (opt) {
                        case '--location':
                            getCommand['location'] = options[index + 1] as GetLocationType;
                            break;
                        default:
                            break;
                    }
                });
                return getCommand;
            default:
                return null;
        }
    }
    
}