import { Injectable } from '@nestjs/common';
import { FirebaseAdminService } from '../firebase-admin/firebase-admin.service';
import { LikeDbItem } from './likes.models';

@Injectable()
export class LikesService {
  constructor(private readonly firebaseAdminService: FirebaseAdminService) {}

  async getLikesForIdea(ideaId: string): Promise<number> {
    const firestore = this.firebaseAdminService.getFirestore();
    const likesQuery = await firestore
      .collection('likes')
      .where('ideaId', '==', ideaId)
      .get();
    return likesQuery.size;
  }

  async likeIdea({ ideaId, userId }: { ideaId: string; userId: string }) {
    const firestore = this.firebaseAdminService.getFirestore();
    const ideaRef = firestore.collection('ideas').doc(ideaId);
    const likeRef = firestore.collection('likes').doc();

    await firestore.runTransaction(async (transaction) => {
      const ideaDoc = await transaction.get(ideaRef);
      if (!ideaDoc.exists) {
        throw new Error('Idea does not exist');
      }

      const likesQuery = await firestore
        .collection('likes')
        .where('userId', '==', userId)
        .where('ideaId', '==', ideaId)
        .get();

      if (!likesQuery.empty) {
        // Do nothing, since the user has already liked this idea
        return;
      }

      const doc: LikeDbItem = { ideaId, userId };
      transaction.set(likeRef, doc);
    });
  }
}
