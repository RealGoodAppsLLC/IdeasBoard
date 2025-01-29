import { Module } from '@nestjs/common';
import { IdeasModule } from './ideas/ideas.module';
import { LikesModule } from './likes/likes.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    IdeasModule,
    LikesModule,
  ],
})
export class AppModule {}
