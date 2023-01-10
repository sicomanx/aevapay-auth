import { Unprotected } from "nest-keycloak-connect";
import { AuthService } from "./auth.service";
import { Body, Controller, Get, HttpCode, Post, Query, Redirect } from "@nestjs/common";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Get('signin')
    @Redirect('' , 301)
    @Unprotected()
    login() {
        return this.authService.getLoginUrl();
    }
    
    @Post('signin')
    @Unprotected()
    signin(@Body() authUserDto:any) {
        return this.authService.signin(authUserDto);
    }

    @Get('signup')
    @Redirect('' , 301)
    @Unprotected()
    register() {
        return this.authService.getRegisterUrl();
    }

    @Post('signup')
    @Unprotected()
    signup(@Body() createUserDto:any) {
        return this.authService.signup(createUserDto);
    }

    @Post('signout')
    @HttpCode(204)
    signout(@Body('refresh_token') refresh_token: string) {
        return this.authService.signout(refresh_token);
    }

    @Post('refresh-token')
    @Unprotected()
    refreshAccessToken(@Body('refresh_token') refresh_token: string) {
        return this.authService.refreshAccessToken(refresh_token);
    }

    @Get('callback')
    @Unprotected()
    getAccessToken(@Query('code') code: string) {
        return this.authService.getAccessToken(code);
    }

}