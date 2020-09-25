import { RootCommandTypes } from "../models/parser.interface";

const chalk = require('chalk');

export class CommandParser {
    constructor() { }

    async parseCommand(type: RootCommandTypes): Promise<void> {
        console.log(chalk.green(`${type}`));
        return Promise.resolve();
    }

    getCommandType(type: string): RootCommandTypes {
        switch (type.toLowerCase()) {
            case 'get':
                return RootCommandTypes.GET
            default:
                return RootCommandTypes.UNKNOWN;
                
        }
    }
}