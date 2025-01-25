import { Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LikesService } from './likes.service';
import { getUserFromRequest } from '../utils/get-user-from-request';

@Controller('ideas/{ideaId}/likes')
@UseGuards(AuthGuard('jwt'))
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post()
  async likeIdea(@Param('ideaId') ideaId: string, @Req() req: unknown) {
    const userId = getUserFromRequest(req);
    await this.likesService.likeIdea({ ideaId, userId });
    return {};
  }
}
