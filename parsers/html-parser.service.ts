import chalk from "chalk";
import { QB_STATS } from "../models/defaults/qb.const";
import { IStatPosition } from "../models/parser.interface";
import { IQBStats } from "../models/qb.interface";
import { writeFile } from 'fs';
import { normalize } from 'path';

const cheerio = require('cheerio');

export async function parserHtmlString(html: any, url: string = ''): Promise<any> {
    
    const $ = cheerio.load(html);
    const table = $('.d3-o-table--detailed');
    const stats = $('td', table);

    let qbStats: IQBStats[] = [];

    const playerSelector = QB_STATS.player.statSelector;
    const passingStatSelector = QB_STATS.passingYds.statSelector;
    const passingYdsPerAttemptSelector = QB_STATS.passingYdsPerAttempt.statSelector;
    const intsSelector = QB_STATS.ints.statSelector;
    const tdsSelector = QB_STATS.tds.statSelector;

    const rows = $('tbody > tr', table);

    $(rows).each((rowIndex: number, row: any) => {
        let qbStat: IQBStats = {
            url,
            player: {
                statSelector: playerSelector
            },
            passingYds: {
                statSelector: passingStatSelector
            },
            ints: {
                statSelector: intsSelector
            },
            passingYdsPerAttempt: {
                statSelector: passingYdsPerAttemptSelector
            },
            tds: {
                statSelector: tdsSelector
            }
        };

           
        //     passingYds: {
        //         statSelector: passingStatSelector,
        //         value: +(<string>stats[passingStatSelector.statColIndex].children[0].data).trim()
        //     },
        //     passingYdsPerAttempt: {
        //         statSelector: passingYdsPerAttemptSelector,
        //         value: +(<string>stats[passingYdsPerAttemptSelector.statColIndex].children[0].data).trim()
        //     },
        //     ints: {
        //         statSelector: intsSelector,
        //         value: +(<string>stats[intsSelector.statColIndex].children[0].data).trim()
        //     },
        //     tds: {
        //         statSelector: tdsSelector,
        //         value: +(<string>stats[tdsSelector.statColIndex].children[0].data).trim()
        //     }
        // };
        $('td', row).each((colIndex: number, col: any) => {
            let {
                player,
                passingYds,
                passingYdsPerAttempt,
                ints,
                tds
             } = qbStat;
             
            if (colIndex === playerSelector.statColIndex) {
                const playerParentSelector = $(`.${playerSelector.statName}`, $(row));
                player = {
                    ...player,
                    value: playerParentSelector.html().trim()
                };
                qbStat = {
                    ...qbStat,
                    player
                };
            } else if (colIndex === passingStatSelector.statColIndex) {
                passingYds = {
                    ...passingYds,
                    value: +(<string>$(col).html()).trim()
                }
                qbStat = {
                    ...qbStat,
                    passingYds
                };
            } else if (colIndex === passingYdsPerAttemptSelector.statColIndex) {
                passingYdsPerAttempt = {
                    ...passingYdsPerAttempt,
                    value: +(<string>$(col).html()).trim()
                };
                qbStat = {
                    ...qbStat,
                    passingYdsPerAttempt
                };
            } else if (colIndex === intsSelector.statColIndex) {
                ints = {
                    ...ints,
                    value: +(<string>$(col).html()).trim()
                };
                qbStat = {
                    ...qbStat,
                    ints
                };
            } else if (colIndex === tdsSelector.statColIndex) {
                tds = {
                    ...tds,
                    value: +(<string>$(col).html()).trim()
                };
                qbStat = {
                    ...qbStat,
                    tds
                };
            }

        });
        qbStats = [...qbStats, qbStat];
    });


    const outputPath = `${__dirname}/../output/qb.json`;
    await writeFile(outputPath, JSON.stringify(qbStats), () => {});

    return Promise.resolve();
}