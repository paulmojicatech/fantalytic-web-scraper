import * as stats from './index';

export enum PositionTypes {
    QB = 'QB'
}

export interface ICommandOptions {
    get: {
        pos: PositionTypes,
        year: string,
        stat: stats.PostionStat
    }
}

export enum RootCommandTypes {
    GET = 'get',
    UNKNOWN = 'unknown'
}

export interface IStatPosition {
    statName: string;
    statColIndex: number;
}

