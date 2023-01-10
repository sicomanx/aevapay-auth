import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthenticatedUser } from "nest-keycloak-connect";
import { UserService } from "./user,.service";

@Controller('user')
export class UserController {
    constructor(private userService:UserService){}
    
    @Get('all')
    find(@AuthenticatedUser() user: any) {
        console.log(user);
        return this.userService.findAll();
    }
}