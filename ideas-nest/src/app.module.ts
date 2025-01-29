import { Module } from '@nestjs/common';
import { IdeasModule } from './ideas/ideas.module';
import { LikesModule } from './likes/likes.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    IdeasModule,
    LikesModule,
    HealthModule,
  ],
})
export class AppModule {}
