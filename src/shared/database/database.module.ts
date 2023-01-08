import { Global, Module } from "@nestjs/common";
import { DatabaseRepository } from "./database.repository";
import { DatabaseService } from "./database.service";

@Global()
@Module({
    providers: [DatabaseRepository, DatabaseService],
    exports: [DatabaseRepository]
})
export class DatabaseModule {}