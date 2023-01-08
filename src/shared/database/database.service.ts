import "reflect-metadata"
import { DataSource } from "typeorm";
import { Injectable } from "@nestjs/common";
import { ConfigurationService } from "../config/config.service";

@Injectable()
export class DatabaseService {

    private readonly dataSource: Promise<DataSource>

    constructor(private readonly config: ConfigurationService) {
        this.dataSource = new DataSource({
            type: <"postgres" | "mysql"> this.config.get('database.dbType'),
            host: this.config.get('database.dbHost'),
            port: this.config.get('database.dbPort'),
            database: <string> this.config.get('database.dbName'),
            username: this.config.get('database.dbUsername'),
            password: <string> this.config.get('database.dbPassword'),
            synchronize: false,
            logging: false,
            entities: [`${__dirname}/entities/*{.ts,.js}`],
            migrations: [`${__dirname}/migrations/*{.ts,.js}`],
            subscribers: [],
        })
        .initialize()
        .then((datasource) => {
            console.log("Data Source has been initialized!")
            return datasource
        })
        .catch((err) => {
            console.error("Error during Data Source initialization", err)
        })
    }

    getDataSource(): Promise<DataSource> {
        return this.dataSource
    }
}

