import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { IdeasModule } from './ideas/ideas.module';
import { LikesModule } from './likes/likes.module';
import { ConfigModule } from '@nestjs/config';

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
