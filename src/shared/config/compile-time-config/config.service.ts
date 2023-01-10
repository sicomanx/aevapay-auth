import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class ConfigurationService {

    constructor(private readonly configService: ConfigService) {}

    public get(propertyPath: string) {
        return this.configService.get(propertyPath);
    }
}