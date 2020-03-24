var postgres = require('pg');
var fs = require('fs');
var sql = fs.readFileSync('../database_schema.sql').toString();

function initDatabase() {
    let pg = new postgres.Pool();

    pg.connect('postgres://eddie:@localhost/truegroupstest', function(err, client, done){
        if(err){
            console.log('error: ', err);
            process.exit(1);
        }
        client.query(sql, function(err, result){
            done();
            if(err){
                console.log('error: ', err);
                process.exit(1);
            }
        });
    });
}

function initDatabaseAndTables() {
    global.db = require('knex')({
          client: 'pg',
          version: '12.1',
          connection: {
            host : '127.0.0.1',
            user : '',
            password : '',
            database : 'truegroups'
          }
    });
}

// initDatabase();
initDatabaseAndTables();