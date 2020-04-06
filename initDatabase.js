const { exec } = require('child_process');

function initDatabase() {
    exec('sudo -u postgres psql -f ./create_test_database_schema.sql', (err) => {
      if (err) {
        // node couldn't execute the command
        console.log(err);
      }
    });
}

initDatabase();
