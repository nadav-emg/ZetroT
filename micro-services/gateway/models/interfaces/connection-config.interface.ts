export interface IConnectionConfig  {
    protocol: string;
    host: string;
    port: number;
    defaultHeaders?: {[key: string]: string};
    authentication?: { username: string; password: string };
    password?: string;
    timeout: number;
}
