import { DataSource } from "typeorm";
import { ConfigRealTime } from "../config/real-time-config/config";

const envs: any = ConfigRealTime.getEnvs()

export const AppDataSource = new DataSource({
    type: envs.DATABASE_TYPE,
    host: envs.DATABASE_HOST,
    port: envs.DATABASE_PORT,
    database: envs.DATABASE_NAME,
    username: envs.DATABASE_USERNAME,
    password: envs.DATABASE_PASSWORD,
    synchronize: false,
    logging: true, 
    entities: [`${__dirname}/entities/*{.ts,.js}`],
    migrations: [`${__dirname}/migrations/*{.ts,.js}`],
    subscribers: [],
})