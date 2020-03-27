const { exec } = require('child_process');

function initDatabase() {
    exec('psql -f ./create_prod_database_schema.sql', (err) => {
      if (err) {
        // node couldn't execute the command
        console.log(err);
      }
    });
}

initDatabase();