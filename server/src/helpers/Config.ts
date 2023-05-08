import process from "process"

const DB_CONFIG = {
  host : '127.0.0.1',
  port: 5432, 
  user: process.env.PG_USER,
  password: process.env.PG_PASS,
  database: 'us_db'
}

const APP_CONFIG = {
  host : "localhost:3000",
  port: 3000,
  protocol : "http"
}

const PORTAL_CONFIG = {
  host : "localhost:4200",
  port: 4200,
  protocol: "http"
}

export class GlobalConfig {
  app : AppConfig
  db : DbConfig
  portal : AppConfig
}

export class AppConfig {
  host: string;
  port: number
  protocol : string;
  constructor(json : any = APP_CONFIG) {
    this.host = json.host;
    this.port = json.port
    this.protocol = json.protocol;
  }
}

export class DbConfig {
  public host : string;
  public port : number;
  public user : string;
  public password : string;
  public database : string;
  constructor(config : any = DB_CONFIG ) {
    this.host = config.host;
    this.port = config.port;
    this.user = config.user;
    this.password = config.password;
    this.database = config.database;
  }
}

const env = process.env.NODE_ENV || 'dev';

const dev : GlobalConfig = {
  app : new AppConfig(),
  db : new DbConfig(),
  portal : new AppConfig(PORTAL_CONFIG)
}

const configs : Map<string, GlobalConfig> = new Map(); 
configs.set('dev',dev);


const config : GlobalConfig = configs.get(env) || dev;

export default config;