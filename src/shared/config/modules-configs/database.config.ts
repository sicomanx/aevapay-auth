import { registerAs } from "@nestjs/config";

export default registerAs('database', () => ({

    dbType:           process.env.DATABASE_TYPE,
    dbHost:           process.env.DATABASE_HOST,
    dbPort:           process.env.DATABASE_PORT,
    dbName:           process.env.DATABASE_NAME,
    dbUsername:       process.env.DATABASE_USERNAME,
    dbPassword:       process.env.DATABASE_PASSWORD

  }));