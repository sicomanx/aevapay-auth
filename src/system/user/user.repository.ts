import { Injectable } from "@nestjs/common";
import { DatabaseRepository } from "src/shared/database/database.repository";

@Injectable()
export class UserRepository {

    constructor(private readonly databaseRepository: DatabaseRepository) {}
    async findAll() {
        return (await this.databaseRepository.getUserRepository()).find();
    }
}