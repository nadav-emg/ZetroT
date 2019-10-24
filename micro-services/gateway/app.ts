import 'reflect-metadata';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as http from 'http';
import * as https from 'https';

//import { getAppRoutes, handleRouteError } from 'microservice_utils';
//import * as compression from 'compression';
//
import { IConnectionConfig} from "./models/interfaces/connection-config.interface";
import { ContainerConfig } from './inversify.config';

export class App {

    public express: express.Application;
    private server: http.Server | https.Server;
    private config: IConnectionConfig;

    public static bootstrap(): void {
        const container = ContainerConfig.getContainer();
        const configService = container.get(ConfigService);
        configService.ready.subscribe(ready => {
            if (ready) {
                return new App(container.get(LoggerService),
                    container.get(ProxyService),
                    container.get(ConfigService),
                    container.get(SocketService),
                    container.get(UsersApiProxy),
                    container.get(DashboardApiProxy),
                    container.get(InvestiagtionApiProxy),
                    container.get(ApiAgentsProxy),
                    container.get(AlertsApiProxy),
                    container.get(AuthenticationRoutes),
                    container.get(UpdateRoutes),
                    container.get(ClientRoutes),
                    container.get(ExceptionApiProxy),
                    container.get(AuditGateWayService),
                    container.get(AuditApiProxy));
            }});
    }

    constructor(logger: LoggerService,
                private proxyService: ProxyService,
                private configService: ConfigService,
                private socketService: SocketService,
                private usersApiProxy: UsersApiProxy,
                private dashboardApiProxy: DashboardApiProxy,
                private investigationApiProxy: InvestiagtionApiProxy,
                private agentsApiProxy: ApiAgentsProxy,
                private alertsApiProxy: AlertsApiProxy,
                private authenticationRoutes: AuthenticationRoutes,
                private updateRoutes: UpdateRoutes,
                private clientRoutes: ClientRoutes,
                private exceptionApiProxy: ExceptionApiProxy,
                private auditGatewayService: AuditGateWayService,
                private auditApiProxy: AuditApiProxy) {
        super(logger);
        this.config = this.configService.get<IConnectionConfig>(ConfigurationTypes.Gateway);
        this.initExpress();
        this.middleware();
        this.initRoutes();
        this.initServer();
        this.initSockets();
        c
    }

    private initExpress(): void {
        this.express = express();
    }

    private middleware(): void {
        if (this.config.protocol === 'https') {
            this.express.use(forceSsl);
        }
        this.express.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT ,DELETE, OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
            next();
        });
        this.express.use(bodyParser.urlencoded({ limit: '50mb', extended: true}) as express.RequestHandler);
        this.express.use(bodyParser.json({ limit: '50mb' }) as express.RequestHandler);
        //this.express.use(compression());
    }

    private initRoutes(): void {
        const router = express.Router();
        // placeholder route handler
        router.get('/', (req, res) => {
            res.json({
                API: getAppRoutes(this.express)
            });
        });
        this.express.use('/', this.updateRoutes.router);
        this.express.use(/^\/(?!api).*/, this.clientRoutes.router);
        this.express.use('/apiList', router);
        this.express.use('/api', this.authenticationRoutes.router);
        this.express.use('/api', this.proxyService.proxyHandler([
            this.usersApiProxy,
            this.dashboardApiProxy,
            this.investigationApiProxy,
            this.agentsApiProxy,
            this.alertsApiProxy,
            this.exceptionApiProxy,
            this.auditApiProxy
        ]));
    }

    private initServer() {

        return this.server = http.createServer(this.express);
    }



    private listen() {
        const port = this.config.port || 8090;
        this.server.listen(port, () => {
            console.log(`gateway running on port: ${port}`);
        });
        this.handleServerError(this.server, port);
    }

    private initRedirectServer(): void {
        // TODO - use NGINX in the future as https and http redirect server
        const redirectServer = http.createServer(this.express); // For forwarding of all requests to HTTPS
        this.handleServerError(redirectServer, 80, true);
        redirectServer.listen(80);
    }

    private handleServerError(server: http.Server | https.Server, port: number, redirector?: boolean): void {
        interface ServerError extends Error {
            syscall: string;
            code: string;
        }
        server.on('error', (error: ServerError) => {
            if (error.syscall !== 'listen') {
                throw error;
            }
            // handle specific listen errors with friendly messages
            switch (error.code) {
                case 'EACCES':
                    console.error(port + 'requires elevated privileges');
                    if (!redirector) {
                        process.exit(1);
                    }
                    break;
                case 'EADDRINUSE':
                    console.error(port + 'is already in use');
                    if (!redirector) {
                        process.exit(1);
                    }
                    break;
                default:
                    throw error;
            }
        })
    }
}
