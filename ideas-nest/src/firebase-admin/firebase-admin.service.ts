import * as admin from 'firebase-admin';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FirebaseAdminService {
  getFirestore() {
    return admin.firestore();
  }

  getAuth() {
    return admin.auth();
  }
}
