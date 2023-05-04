const knex = require('knex')({
  client: 'psql',
  connection: {
    host : '127.0.0.1',
    port : 5432,
    user : 'us_server',
    password : 'AppMapFtw',
    database : 'us_db'
  }
});