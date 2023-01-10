import { Module } from "@nestjs/common";
import { DatabaseModule } from "./database/database.module";
import { KeycloakModule } from "./keycloak/kecloak.module";
import { ConfigurationModule } from "./config/compile-time-config/config.module";
import { CacheModule } from "./cache/cache.module";

@Module({
    imports: [
        CacheModule, 
        DatabaseModule,
        KeycloakModule,
        ConfigurationModule
    ]
})
export class SharedModule{}