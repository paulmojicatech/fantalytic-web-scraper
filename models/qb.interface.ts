import { PositionTypes } from './parser.interface';

export interface IQB {
    position: PositionTypes
    stats: QBStatTypes[]
}

export enum QBStatTypes {
    PASSING_YDS =  'Passing Yds',
    INT = 'INT',
    TD = 'TD',
    PASSING_PER_ATT = 'Passing Per Attempt'
}