import { CacheModule as CachingModule, Global, Module } from "@nestjs/common";

@Global()
@Module({
    imports: [CachingModule.register()],
    exports: [CachingModule]
})

export class CacheModule {}