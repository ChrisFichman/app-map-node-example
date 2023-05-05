import { Knex } from 'knex';
import { DbHelper } from '../helpers/DbClient.js'

export class MapperService {
  protected dbClient : Knex
  constructor(dbClient: Knex = new DbHelper().getConnection()) {
    this.dbClient = dbClient;
  }

  public async getOriginalUrl(shortUrl:string) : Promise<string> {
    const query = this.dbClient.from('url.map').where('short_url',shortUrl).limit(1);
    const result = await query.pluck('orig_url');
    console.log(result.toString())
    return result[0]
  }

  public async getShortUrl(origUrl:string) : Promise<any[]>{
    const query = this.dbClient.from('url.map').where('orig_url',origUrl);
    return await query.select('short_url');
  }

  /**
   * Creates a mapping row in the database
   * 
   * @param origUrl - original url string
   * @param shortUrl - shortened url key
   * @returns 
   */
  public async createUrlMapping(origUrl:string, shortUrl: string) {
    const insertedRecord = await this.dbClient.insert({
      short_url : shortUrl,
      orig_url : origUrl
    }).into('url.map');
    return insertedRecord;
  }
}