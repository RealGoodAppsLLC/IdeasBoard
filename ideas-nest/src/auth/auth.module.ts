import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { FirebaseAuthGuard } from './firebase-auth.guard';
import { FirebaseAdminModule } from '../firebase-admin/firebase-admin.module';

@Module({
  controllers: [AuthController],
  providers: [FirebaseAuthGuard],
  exports: [FirebaseAuthGuard],
  imports: [FirebaseAdminModule],
})
export class AuthModule {}
