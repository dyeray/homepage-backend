import database, {bulkInsert} from './database.js';

const filmTable = {
    database,
    tableName: `film`,
    columnTypes: {
      film_id: database.sql`serial`,
      source_id: database.sql`VARCHAR(10)`,
      internal_id: database.sql`VARCHAR(32)`,
      title: database.sql`VARCHAR (50)`,
      image_url: database.sql`VARCHAR (512)`
    },
};

export async function list() {
    return await database.query(database.sql`SELECT * FROM film;`);
}

export function removeOldEntries() {

}

export async function add(films) {
    await bulkInsert({
        ...filmTable,
        columnsToInsert: [`source_id`, `internal_id`, `title`, `image_url`],
        records: films,
      });
}

export async function safeAdd(films) {
    await database.tx(async (database) => {
        films.forEach( async (film) => {
            await database.query(
                database.sql`INSERT INTO film (source_id, internal_id, title, image_url)
                VALUES (${film.source_id}, ${film.internal_id}, ${film.title}, ${film.image_url})
                ON CONFLICT (source_id,internal_id) DO NOTHING`
            );
        });
    });
}
