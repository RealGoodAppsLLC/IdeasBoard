import { SafeParseReturnType } from 'zod';

export interface ZodParsable<Input, Output> {
  safeParse: (input: unknown) => SafeParseReturnType<Input, Output>;
}

export const parseBody = <TBody>(
  body: unknown,
  schema: ZodParsable<unknown, TBody>,
) => {
  const parseResult = schema.safeParse(body);

  if (!parseResult.success) {
    throw new Error(parseResult.error.errors.map((e) => e.message).join(', '));
  }

  return parseResult.data;
};
