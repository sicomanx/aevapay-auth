import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { SystemModule } from './system/system.module';
import { SharedModule } from './shared/shared.module';
import { AuthGuard, ResourceGuard, RoleGuard } from "nest-keycloak-connect";

@Module({
    imports: [
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
      useClass: ResourceGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}
