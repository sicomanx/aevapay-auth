import { Global, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ConfigurationService } from "./config.service";
import databaseConfig from "./modules-configs/database.config";
import keycloakConfig from './modules-configs/keycloak.config';

@Global()
@Module({
    imports: [
        ConfigModule.forRoot({
            load: [
                databaseConfig,
                keycloakConfig
            ],
            envFilePath: ['.env'],
        }),
    ],
    providers: [ConfigurationService],
    exports: [ConfigurationService]
})
export class ConfigurationModule{}