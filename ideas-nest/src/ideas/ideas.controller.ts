import {
  Controller,
  Post,
  Put,
  Get,
  Param,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { IdeasService } from './ideas.service';
import { parseBody } from '../utils/parse-body';
import { CreateIdeaDto, UpdateIdeaDto } from './ideas.models';
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard';
import AppRequest from '../utils/app-request';

@Controller('ideas')
export class IdeasController {
  constructor(private readonly ideasService: IdeasService) {}

  @Post()
  @UseGuards(FirebaseAuthGuard)
  async createIdea(@Body() body: unknown, @Req() req: AppRequest) {
    const createIdeaDto = parseBody(body, CreateIdeaDto);
    return this.ideasService.createIdea({
      userId: req.user!.sub,
      createIdeaDto,
    });
  }

  @Put(':id')
  @UseGuards(FirebaseAuthGuard)
  async updateIdea(@Param('id') id: string, @Body() body: unknown) {
    // todo: We need to introduce a concept of ownership for ideas. Another user should not be able to update another idea.
    const updateIdeaDto = parseBody(body, UpdateIdeaDto);
    return this.ideasService.updateIdea({ id, updateIdeaDto });
  }

  @Get(':id')
  async getIdea(@Param('id') id: string) {
    return this.ideasService.getIdea(id);
  }

  @Get(':cursor')
  async getIdeas(@Param('cursor') cursor: string) {
    return this.ideasService.getIdeas({ cursor });
  }
}
