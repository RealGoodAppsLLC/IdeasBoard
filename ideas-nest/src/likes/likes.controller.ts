import { Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { LikesService } from './likes.service';
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard';
import AppRequest from '../utils/app-request';

@Controller('ideas/:ideaId/likes')
@UseGuards(FirebaseAuthGuard)
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post()
  async likeIdea(@Param('ideaId') ideaId: string, @Req() req: AppRequest) {
    await this.likesService.likeIdea({ ideaId, userId: req.user!.sub });
  }
}
