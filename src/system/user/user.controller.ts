import { Controller, Get, UseGuards } from "@nestjs/common";
import { UserService } from "./user,.service";

@Controller('user')
export class UserController {
    constructor(private userService:UserService){}
    
    @Get('all')
    find() {
        return this.userService.findAll();
    }
}