import { z } from 'zod';
import {parseBody} from "./parse-body";

export const getUserFromRequest = (req: unknown) => {
  const requestSchema = z.object({
    user: z.object({
      userId: z.string(),
    }),
  });

  const result = parseBody(req, requestSchema);

  return result.user.userId;
};
