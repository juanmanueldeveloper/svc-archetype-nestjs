import { Environment } from '../enums/environment.enum';
import { IIntegrations } from './integrations.interface';
import { IDatabase } from './database.interface';

export interface IAppConfig {
    environment: Environment;
    projectName: string;
    rootPath: string;
    appPort: number;
    integrations: IIntegrations;
    database: IDatabase;
}
