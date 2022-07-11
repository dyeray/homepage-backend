import createConnectionPool from '@databases/pg';
import { bulkInsert } from '@databases/pg-bulk';

const database = createConnectionPool({bigIntMode: "bigint"});

function initDB() {
  database.query(database.sql.file(new URL("./database.sql", import.meta.url))).catch(ex => {
      console.error(ex);
      process.exitCode = 1;
    }).then(() => database.dispose());
}

export {bulkInsert, initDB};
export default database;
