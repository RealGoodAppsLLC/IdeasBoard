import { Module } from '@nestjs/common';
import { FirebaseAuthGuard } from './firebase-auth.guard';
import { FirebaseAdminModule } from '../firebase-admin/firebase-admin.module';

@Module({
  providers: [FirebaseAuthGuard],
  exports: [FirebaseAuthGuard],
  imports: [FirebaseAdminModule],
})
export class AuthModule {}
