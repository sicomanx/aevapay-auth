import { Cache } from 'cache-manager';
import { HttpService } from '@nestjs/axios';
import { catchError, lastValueFrom, map } from 'rxjs';
import { CACHE_MANAGER, HttpException, Inject, Injectable } from '@nestjs/common';
import { ConfigurationService } from 'src/shared/config/compile-time-config/config.service';

@Injectable()
export class AuthService {

    private keycloakLoginUri: string;
    private keycloakRegisterUri: string;
    private keycloakRedirectUri: string;
    private keycloakClientId: string;
    private keycloakClientSecret: string;
    private keycloakTokenUri: string;
    private keycloakLogoutUri: string;
    private keycloakUsersUri: string;
    private keycloakAdminTokenTtl: number;

    constructor(
        private readonly config: ConfigurationService, 
        private readonly http: HttpService,
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache
    ) {

        this.keycloakClientId = this.config.get('keycloak.clientID'); 
        this.keycloakClientSecret = this.config.get('keycloak.clientSecret');
        this.keycloakTokenUri = this.config.get('keycloak.tokenURI');
        this.keycloakLoginUri = this.config.get('keycloak.loginURI');
        this.keycloakLogoutUri = this.config.get('keycloak.logoutURI');
        this.keycloakRegisterUri = this.config.get('keycloak.registerURI')
        this.keycloakUsersUri = this.config.get('keycloak.usersURI');
        this.keycloakRedirectUri = this.config.get('keycloak.redirectURI');
        this.keycloakAdminTokenTtl = this.config.get('keycloak.adminTokenTTL');

    }
    
    getLoginUrl(): any {
        return { url: `${this.keycloakLoginUri}`
        +`?client_id=${this.keycloakClientId}`
            +`&response_type=code`
            +`&scope=profile`
            +`&redirect_uri=${this.keycloakRedirectUri}`
        }
    }

    getRegisterUrl(): any {
        return { url: `${this.keycloakRegisterUri}`
        +`?client_id=${this.keycloakClientId}`
            +`&response_type=code`
            +`&scope=profile`
            +`&redirect_uri=${this.keycloakRedirectUri}`
        }
    }

    getAccessToken(code: string) {
        const params = {
            grant_type: 'authorization_code',
            client_id: this.keycloakClientId,
            client_secret: this.keycloakClientSecret,
            code: code,
            redirect_uri: this.keycloakRedirectUri
        }

        return this.http.post (
            this.keycloakTokenUri,
            params,
            {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
        ).pipe(
            map(response => response.data),
            catchError( e => { throw new HttpException( e.response.data, e.response.status) })
        );
    }

    async signin(data: any) {

        const params = {
            grant_type: 'password',
            client_id: this.keycloakClientId,
            client_secret: this.keycloakClientSecret,
            username: data.username,
            password: data.password
        }

        return this.http.post(
            this.keycloakTokenUri,
            params,
            {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
        ).pipe(
            map(response => response.data),
            catchError( e => { throw new HttpException(e.response.data, e.response.status) })
        );
    }

    async signup(data: any) {

        const params = {
            enabled: true,
            username: data.username,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            credentials: [{
                type: "password",
                value: data.password,
                temporary: false
            }]
        }

        return this.http.post (
            this.keycloakUsersUri,
            params,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'bearer ' + await this.getKecloakAccessToken()
                }
            }
        ).pipe(
            map(response => response.data),
            catchError( e => { throw new HttpException( e.response.data, e.response.status) })
        );
    }
    
    signout(refresh_token: string) {

        const params = {
            client_id: this.keycloakClientId,
            client_secret: this.keycloakClientSecret,
            refresh_token: refresh_token,
        }

        return this.http.post (
            this.keycloakLogoutUri,
            params,
            {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
        ).pipe(
            map(response => response.data),
            catchError( e => { throw new HttpException( e.response.data, e.response.status) })
        );
    }

    refreshAccessToken(refresh_token: string) {

        const params = {
            grant_type: 'refresh_token',
            client_id: this.keycloakClientId,
            client_secret: this.keycloakClientSecret,
            refresh_token: refresh_token
        }

        return this.http.post (
            this.keycloakTokenUri,
            params,
            {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
        ).pipe(
            map(response => response.data),
            catchError( e => { throw new HttpException( e.response.data, e.response.status) })
        );
    }

    async getKecloakAccessToken() {

        const admin_token = await this.cacheManager.get('admin_token');

        if (admin_token === null || admin_token === undefined) {
            const params = {
                grant_type: 'client_credentials',
                client_id: this.keycloakClientId,
                client_secret: this.keycloakClientSecret,
            }
    
            const request = this.http.post (
                this.keycloakTokenUri,
                params,
                {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
            ).pipe(
                map(response => response.data),
                catchError( e => { throw new HttpException( e.response.data, e.response.status) })
            );
    
            const data = await lastValueFrom(request);
    
            await this.cacheManager.set('admin_token', data.access_token, (this.keycloakAdminTokenTtl - 5) * 1000);

            return data.access_token;
    
        }

        return admin_token;
    }
}