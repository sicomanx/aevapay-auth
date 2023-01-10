import { registerAs } from "@nestjs/config";

export default registerAs('keycloak', () => ({

    realm:                  process.env.KEYCLOAK_REALM,
    clientID:               process.env.KEYCLOAK_CLIENT_ID,
    clientSecret:           process.env.KEYCLOAK_CLIENT_SECRET,
    loginURI:               process.env.KEYCLOAK_LOGIN_URI,
    registerURI:            process.env.KEYCLOAK_REGISTER_URI,
    logoutURI:              process.env.KEYCLOAK_LOGOUT_URI,
    authURI:                process.env.KEYCLOAK_AUTH_URI,
    usersURI:               process.env.KEYCLOAK_USERS_URI,
    tokenURI:               process.env.KEYCLOAK_TOKEN_URI,
    redirectURI:            process.env.KEYCLOAK_REDIRECT_URI,
    enforcePolicy:          process.env.KEYCLOAK_ENFORCE_POLICY,
    tokenValidationOnline:  process.env.KEYCLOAK_TOKEN_VALIDATION_ONLINE,
    adminTokenTTL:          process.env.KEYCLOAK_ADMIN_TOKEN_TTL

  }));