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
import { AuthGuard } from '@nestjs/passport';
import { getUserFromRequest } from '../utils/get-user-from-request';

@Controller('ideas')
export class IdeasController {
  constructor(private readonly ideasService: IdeasService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createIdea(@Body() body: unknown, @Req() req: unknown) {
    const createIdeaDto = parseBody(body, CreateIdeaDto);
    const userId = getUserFromRequest(req);
    return await this.ideasService.createIdea({ userId, createIdeaDto });
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async updateIdea(@Param('id') id: string, @Body() body: unknown) {
    const updateIdeaDto = parseBody(body, UpdateIdeaDto);
    return await this.ideasService.updateIdea({ id, updateIdeaDto });
  }

  @Get(':id')
  async getIdea(@Param('id') id: string) {
    return await this.ideasService.getIdea(id);
  }

  @Get(':cursor')
  async getIdeas(@Param('cursor') cursor: string) {
    return await this.ideasService.getIdeas({ cursor });
  }
}
