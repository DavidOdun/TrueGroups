const { exec } = require('child_process');

function initDatabase() {
    exec('psql -d postgres -f ../create_test_database_schema.sql', (err) => {
      if (err) {
        // node couldn't execute the command
        process.close(1);
      }
    });
}

function initDatabaseAndTables() {
    global.db = require('knex')({
          client: 'pg',
          version: '12.1',
          connection: {
            host : '127.0.0.1',
            user : 'truegroups_user',
            password : '',
            database : 'truegroups_test'
          }
    });
}

initDatabase();
initDatabaseAndTables();