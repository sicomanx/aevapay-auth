import { Body, Controller, Get, HttpCode, Post, Query, Redirect } from "@nestjs/common";
import { Unprotected } from "nest-keycloak-connect";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Get('login')
    @Redirect('' , 301)
    @Unprotected()
    login() {
        return this.authService.getLoginUrl();
    }

    @Get('callback')
    @Unprotected()
    getAccessToken(@Query('code') code: string) {
        return this.authService.getAccessToken(code);
    }
    
    @Post('signin')
    @Unprotected()
    signin(@Body() authUserDto:any) {
        return this.authService.signin(authUserDto);
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

}