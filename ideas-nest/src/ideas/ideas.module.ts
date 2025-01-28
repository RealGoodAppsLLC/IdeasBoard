import { Module } from '@nestjs/common';
import { IdeasController } from './ideas.controller';
import { IdeasService } from './ideas.service';
import { FirebaseAdminModule } from '../firebase-admin/firebase-admin.module';
import { LikesModule } from '../likes/likes.module';

@Module({
  imports: [FirebaseAdminModule, LikesModule],
  controllers: [IdeasController],
  providers: [IdeasService],
  exports: [IdeasService],
})
export class IdeasModule {}
