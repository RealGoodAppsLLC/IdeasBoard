import { z } from 'zod';

export const LikeDbItem = z.object({
  userId: z.string(),
  ideaId: z.string(),
});

export type LikeDbItem = z.infer<typeof LikeDbItem>;
