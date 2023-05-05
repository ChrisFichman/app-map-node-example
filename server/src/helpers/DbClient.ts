import process from "process";
import config, {DbConfig} from './Config.js';

import knex, { Knex } from 'knex'
const defaultConfig = {
  host : '127.0.0.1',
  port: 5432, 
  user: process.env.PG_USER,
  password: process.env.PG_PASS,
  database: 'us_db'
}

export class DbHelper {
  private dbConfig : DbConfig;
  constructor (dbConfig : DbConfig = config.db) {
    this.dbConfig = dbConfig
  }

  public getConnection(dbConfig : DbConfig = this.dbConfig) : Knex {
    return knex({
      client: 'pg',
      connection: dbConfig
    });
  }
}
