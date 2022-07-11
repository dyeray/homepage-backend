import datasources from "../datasource/datasources.js";
import * as Film from '../db/film.js';

async function syncDB() {
    let films = (await Promise.all(datasources.map(async(source) => await source()))).flat();
    await Film.safeAdd(films);
}

await syncDB();
process.exit();
