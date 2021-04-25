import express from "express";
import winston from "winston";
import expressWinston from "express-winston";
import { AbstractRoutes } from "./routes/abstract.route";
import { NewsSitesRoutes } from './routes/news.sites.route';

const app = express();
const port = 8080;
const routes: AbstractRoutes[] = [];

const logger = winston.createLogger({
    transports: [
      new winston.transports.Console()
    ]
  })

app.use(expressWinston.logger({
    transports: [
      new winston.transports.Console()
    ],
    meta: false,
    msg: "HTTP  ",
    expressFormat: true,
    colorize: false,
    ignoreRoute (req, res) { return false; }
  }));

routes.push(new NewsSitesRoutes(app));

// start the Express server
app.listen( port, () => {
  logger.info(`http://localhost:${port}`);
  routes.forEach(route => logger.info(`${route.name} has been configured`));
});