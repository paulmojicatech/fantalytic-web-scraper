const fetch = require('node-fetch');


export async function getSiteContent(): Promise<any> {
    const response = await fetch('https://nfl.com/stats/player-stats');
    return Promise.resolve(response);
}