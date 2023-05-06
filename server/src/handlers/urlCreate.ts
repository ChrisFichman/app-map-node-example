import { MapperService } from "../services/Mapper.js";
import { generateShortURL } from "../helpers/Shortener.js";
import { validateUrl } from "../helpers/UrlHandler.js";
// modern module syntax
export async function handler(event : any, context : any, callback : Function) {
  const mapperService = new MapperService();
  // async/await also works out of the box
  let origUrl: URL
  let body = JSON.parse(event.body);
  
  // Check that provided URL is valid
  try {
    origUrl = validateUrl(body.origUrl);
  } catch (err){
    handleUserError(err, event, callback)
    return;
  }

  // Check if we already have an entry for the url
  try {
    const result = await mapperService.getShortUrl(origUrl.href);
    if(result?.length > 0) {
      console.log(`Short URL for "${origUrl.href}" already exists: ${result[0]}`)
      const response = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({
          shortUrl: result[0],
        }),
      };
      callback(null, response);
      return;
    }
  } catch (err) {
    handleServiceError(err, event, callback);
    return;
  }
  
  // Generate a short URL since no entries exist for the original, and make sure it's parsable
  let shortUrl: URL
  try {
    shortUrl = generateShortURL(origUrl.href);
  } catch (err) {
    handleServiceError(err, event, callback);
    return;
  }

  // Create a mapping entry in the db for the URL
  try {
    const mapping = await mapperService.createUrlMapping(origUrl.href, shortUrl.href);
    console.log(`Inserted new map to database: ${JSON.stringify({origUrl: origUrl.href, shortUrl: shortUrl.href})}`);
    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
        shortUrl: shortUrl.href,
      })
    }
    callback(null, response);
    return;
  } catch (err) {
    handleServiceError(err, event, callback);
  }
}

const handleServiceError = (err: any, event: any, callback: Function) => {
  console.error(err);
  const response = {
    statusCode: 500,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({
      message: `An unexpected error occurred.`,
      input: event
    })
  }
  callback(null, response);
}

const handleUserError = (err: any, event: any, callback: Function) => {
  console.error(err);
  const response = {
    statusCode: 400,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({
      message: err.message,
      input: event
    })
  }
  callback(null, response);
}