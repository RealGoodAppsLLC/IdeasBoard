import { Module } from '@nestjs/common';
import { LikesController } from './likes.controller';
import { LikesService } from './likes.service';
import { FirebaseAdminModule } from '../firebase-admin/firebase-admin.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule, FirebaseAdminModule],
  controllers: [LikesController],
  providers: [LikesService],
  exports: [LikesService],
})
export class LikesModule {}
