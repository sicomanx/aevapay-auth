import { CacheModule, Module } from '@nestjs/common';
import { AuthGuard, RoleGuard } from "nest-keycloak-connect";
import { APP_GUARD } from '@nestjs/core';
import { SystemModule } from './system/system.module';
import { SharedModule } from './shared/shared.module';

@Module({
    imports: [
      CacheModule.register({
        isGlobal: true
      }),

      SharedModule,
      SystemModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}
