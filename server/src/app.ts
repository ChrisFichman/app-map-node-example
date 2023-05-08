import express, { Express, Request, Response } from 'express';
import config from './helpers/Config.js';
import { MapperService } from "./services/Mapper.js";

const app: Express = express();
const port = config.app.port;
const mapperService = new MapperService();

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin",`http://${config.portal.host}`);
  res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/hello', (req:Request, res: Response) => {
  res.status(200);
  res.end("Hello world");
});

app.get('/url/:shortUrl', mapperService.expressReadUrl);
app.post('/url', mapperService.expressCreateUrl);

app.listen(port, () => {
  console.log(`⚡️[corti]: Server is running at http://localhost:${port}`);
});