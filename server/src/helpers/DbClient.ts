import config, {DbConfig} from './Config.js';

import knex, { Knex } from 'knex'

export class DbHelper {
  private dbConfig : DbConfig;
  constructor (dbConfig : DbConfig = config.db) {
    this.dbConfig = dbConfig
  }

  public getConnection(dbConfig : DbConfig = this.dbConfig) : Knex {
    return knex({
      client: 'pg',
      connection: {
        host: dbConfig.host,
        port: dbConfig.port,
        user: process.env.PG_USER,
        password: process.env.PG_PASS,
        database: dbConfig.database
      }
    });
  }
}
