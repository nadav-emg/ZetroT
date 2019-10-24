import { Container } from 'inversify';

export class ContainerConfig {
    static getContainer() {
        const container = new Container({ defaultScope: 'Singleton' });
        // Services

        // Proxies

        // Controllers

        // Routes

        return container;
    }
}
