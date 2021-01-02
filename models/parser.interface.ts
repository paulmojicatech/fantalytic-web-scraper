import * as stats from './index';

export enum PositionTypes {
    QB = 'QB',
    UNKNOWN = 'UNKNOWN'
}

export enum GetLocationType {
    HTTP = 'HTTP',
    MONGO = 'MONGO',
    FILE = 'FILE'
}

export interface ICommandOptions {
    get: {
        location: GetLocationType,
        pos: PositionTypes,
        year: string,
        stat: stats.PostionStat
    }
}

export enum CommandTypes {
    ROOT = 'root'
}

export enum RootCommandTypes {
    GET = 'get',
    CHECK = 'check',
    UPLOAD = 'upload',
    UNKNOWN = 'unknown'
}

export interface IStatPosition {
    statName: string;
    statColIndex: number;
}

