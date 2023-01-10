import { Global, Module } from "@nestjs/common";
import { ConfigurationService } from "../config/compile-time-config/config.service";
import { KeycloakConnectModule, PolicyEnforcementMode, TokenValidation } from 'nest-keycloak-connect';

@Global()
@Module({
    imports: [
        KeycloakConnectModule.registerAsync({
            useFactory: (config: ConfigurationService) => {
              return {
                authServerUrl: config.get('keycloak.authURI'),
                realm: config.get('keycloak.realm'),
                clientId: config.get('keycloak.clientID'),
                secret: config.get('keycloak.clientSecret'),
                tokenValidation: config.get('keycloak.tokenValidationOnline') == 'true' ? TokenValidation.ONLINE : TokenValidation.OFFLINE,
                policyEnforcement: config.get('keycloak.enforcePolicy') == 'true'? PolicyEnforcementMode.ENFORCING : PolicyEnforcementMode.PERMISSIVE,
              }
            },
            inject: [ConfigurationService],
          }),
    ],
    exports: [KeycloakConnectModule]
})
export class KeycloakModule {}