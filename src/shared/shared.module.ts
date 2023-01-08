import { Module } from "@nestjs/common";
import { DatabaseModule } from "./database/database.module";
import { KeycloakModule } from "./keycloak/kecloak.module";
import { ConfigurationModule } from "./config/config.module";

@Module({
    imports: [
        ConfigurationModule, 
        DatabaseModule,
        KeycloakModule
    ]
})
export class SharedModule{}