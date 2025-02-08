import { z } from 'zod';

export const CreateIdeaDto = z.object({
  title: z.string(),
  description: z.string(),
});

export type CreateIdeaDto = z.infer<typeof CreateIdeaDto>;

export const IdeaDbItem = CreateIdeaDto.extend({
  timestampCreated: z.number(),
  timestampUpdated: z.number(),
  userId: z.string(),
});

export type IdeaDbItem = z.infer<typeof IdeaDbItem>;

export const Idea = IdeaDbItem.extend({
  likes: z.number(),
  id: z.string(),
});

export type Idea = z.infer<typeof Idea>;

export const UpdateIdeaDto = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
});

export type UpdateIdeaDto = z.infer<typeof UpdateIdeaDto>;
