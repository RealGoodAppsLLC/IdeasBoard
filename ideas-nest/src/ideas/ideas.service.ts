import { Injectable } from '@nestjs/common';
import { FirebaseAdminService } from '../firebase-admin/firebase-admin.service';
import { CreateIdeaDto, Idea, IdeaDbItem, UpdateIdeaDto } from './ideas.models';
import { parseBody } from '../utils/parse-body';
import { LikesService } from '../likes/likes.service';

@Injectable()
export class IdeasService {
  constructor(
    private readonly firebaseAdminService: FirebaseAdminService,
    private readonly likesService: LikesService,
  ) {}

  async createIdea({
    userId,
    createIdeaDto,
  }: {
    userId: string;
    createIdeaDto: CreateIdeaDto;
  }): Promise<Idea> {
    const firestore = this.firebaseAdminService.getFirestore();
    const ideaRef = firestore.collection('ideas').doc();
    const ideaDbItem: IdeaDbItem = {
      ...createIdeaDto,
      userId,
      timestampCreated: new Date(),
      timestampUpdated: new Date(),
    };
    await ideaRef.set(ideaDbItem);
    return { id: ideaRef.id, ...ideaDbItem, likes: 0 };
  }

  async updateIdea({
    id,
    updateIdeaDto,
  }: {
    id: string;
    updateIdeaDto: UpdateIdeaDto;
  }) {
    const firestore = this.firebaseAdminService.getFirestore();
    const ideaRef = firestore.collection('ideas').doc(id);
    const snapshot = await ideaRef.get();
    const existingData = snapshot.data();
    const existingItem = parseBody(existingData, IdeaDbItem);
    const newItem: IdeaDbItem = {
      ...existingItem,
      ...updateIdeaDto,
      timestampUpdated: new Date(),
    };
    await ideaRef.update(newItem);
  }

  async getIdea(id: string): Promise<Idea | null> {
    const firestore = this.firebaseAdminService.getFirestore();
    const ideaRef = firestore.collection('ideas').doc(id);
    const ideaDoc = await ideaRef.get();

    if (!ideaDoc.exists) {
      return null;
    }

    const ideaData = ideaDoc.data();
    const ideaDataTyped = parseBody(ideaData, IdeaDbItem);
    return {
      id,
      ...ideaDataTyped,
      likes: await this.likesService.getLikesForIdea(id),
    };
  }

  async getIdeas({ cursor }: { cursor?: string }) {
    const firestore = this.firebaseAdminService.getFirestore();
    let query = firestore
      .collection('ideas')
      .orderBy('timestampCreated', 'desc')
      .limit(25);

    if (cursor) {
      const cursorDoc = await firestore.collection('ideas').doc(cursor).get();
      query = query.startAfter(cursorDoc);
    }

    // Fetch the page of ideas
    const querySnapshot = await query.get();
    const ideas: Idea[] = [];

    const likeCountPromises: Promise<number>[] = [];

    querySnapshot.forEach((doc) => {
      const ideaData = doc.data();
      const ideaDataTyped = parseBody(ideaData, IdeaDbItem);
      likeCountPromises.push(this.likesService.getLikesForIdea(doc.id));

      // Push the idea into the array (without likes for now)
      ideas.push({ id: doc.id, ...ideaDataTyped, likes: 0 });
    });

    const likeCounts = await Promise.all(likeCountPromises);

    ideas.forEach((idea, index) => {
      idea.likes = likeCounts[index];
    });

    return ideas;
  }
}
