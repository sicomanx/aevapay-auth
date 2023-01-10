import "reflect-metadata"
import { Injectable } from "@nestjs/common";
import { AppDataSource } from "./database.datasource";
import { DataSource } from "typeorm";

@Injectable()
export class DatabaseService {

    private readonly dataSource: Promise<DataSource>

    constructor() {
        this.dataSource = AppDataSource
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

