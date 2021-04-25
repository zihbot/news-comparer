import { AbstractRoutes } from './abstract.route';
import express from 'express';
import newsSitesService from '../services/news.sites.service';


export class NewsSitesRoutes extends AbstractRoutes {
    constructor(app: express.Application) {
        super(app, "NewsSitesRoutes", 'newssite');
    }

    configureRoutes(router: express.Router): void {
        router.get('/', (req, res) => res.status(200).send(newsSitesService.getSite()));
        router.get('/similarity', (req, res) => res.status(200).send(newsSitesService.getSimilarity()));
    }
}