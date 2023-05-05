import { MapperService } from "../services/Mapper.js";
import { validateUrl } from "../helpers/UrlHandler.js";
import config from "../helpers/Config.js";

export async function handler(event : any, context : any, callback : Function) {
  const mapperService = new MapperService();
  const shortUrl = validateUrl(`${config.app.protocol}://${config.app.host}/${event.pathParameters.shortUrl}`);
  console.log(shortUrl);
  const origUrl = await mapperService.getOriginalUrl(shortUrl.href);
  if (origUrl) {
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: `Your original URL was: ${origUrl}}`,
        input: event,
      }),
    };
    callback(null, response);
  } else {
    const response = {
      statusCode: 400,
      body: JSON.stringify({
        message: `Your original URL was not found.`,
        input: event,
      }),
    };
    callback(null, response);    
  }

}