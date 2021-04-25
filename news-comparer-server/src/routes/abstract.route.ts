import express, { IRoute } from "express";

export abstract class AbstractRoutes {
    app: express.Application;
    name: string;

    constructor(app: express.Application, name: string, basepath: string) {
        this.app = app;
        this.name = name;

        const router = express.Router();
        this.configureRoutes(router);
        this.app.use('/rest/' + basepath, router);
    }

    abstract configureRoutes(router: express.Router): void;
}