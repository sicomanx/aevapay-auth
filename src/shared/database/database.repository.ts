import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/shared/database/database.service";
import { ObjectLiteral, EntityTarget, Repository } from "typeorm";
import { User } from "./entities/User";

@Injectable()
export class DatabaseRepository {

    constructor(private readonly databaseService: DatabaseService) {}

    private async getRepository(entity: EntityTarget<ObjectLiteral>): Promise<Repository<ObjectLiteral>> {

        return (await this.databaseService.getDataSource()).getRepository(entity);
    }

    public getUserRepository(): Promise<Repository<ObjectLiteral>> {
        return this.getRepository(User);
    }
}