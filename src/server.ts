const bodyParser = require('body-parser');
import express, { Application } from "express";
import { createServer, Server as HTTPServer } from "http";
import fetch, { RequestInit}  from 'node-fetch';
import cors from 'cors';
import path from "path";

export class Server {
    private httpServer: HTTPServer;
    private app: Application;

    private readonly DEFAULT_PORT = 5000;

    constructor() {
        this.initialize();
        this.handleRoutes();
        // this.handleSocketConnection();
    }

    private initialize(): void {
        this.app = express();
        this.app.use(bodyParser.json());
        this.app.use(cors());
        this.httpServer = createServer(this.app);

        this.configureApp();
    }

    private configureApp(): void {
        this.app.use(express.static(path.join(__dirname, "../public")));
    }

    private handleRoutes(): void {


        this.app.get("/", (req, res) => {
            res.send(`<div>Hello World<div>`);
        });


        this.app.post("/getData", (req, res) => {

            const requestOptions: RequestInit = {
                method: 'GET',
                redirect: 'follow'
            };

            fetch("https://hs-resume-data.herokuapp.com/v3/candidates/all_data_b1f6-acde48001122", requestOptions)
                .then(response => response.text())
                .then(result => res.send(result))
                .catch(error => res.status(404));
        });
    }

    public listen(callback: (port: number) => void): void {
        this.httpServer.listen(this.DEFAULT_PORT, () =>
            callback(this.DEFAULT_PORT)
        );
    }
}