import { Module } from '@nestjs/common';
import { IdeasModule } from './ideas/ideas.module';
import { LikesModule } from './likes/likes.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    IdeasModule,
    LikesModule,
  ],
})
export class AppModule {}
