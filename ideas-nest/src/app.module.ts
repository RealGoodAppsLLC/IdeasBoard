import { Module } from '@nestjs/common';
import { IdeasController } from './ideas/ideas.controller';
import { LikesController } from './likes/likes.controller';
import { IdeasService } from './ideas/ideas.service';
import { LikesService } from './likes/likes.service';
import { FirebaseAdminService } from './firebase-admin/firebase-admin.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule],
  controllers: [IdeasController, LikesController],
  providers: [LikesService, IdeasService, FirebaseAdminService],
})
export class AppModule {}
