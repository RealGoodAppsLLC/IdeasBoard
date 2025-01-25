import * as admin from 'firebase-admin';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FirebaseAdminService {
  private firestore = admin.firestore();

  getFirestore() {
    return this.firestore;
  }

  getAuth() {
    return admin.auth();
  }
}
