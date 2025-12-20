import { z } from 'zod';

export type UserSchemaType = {
  name: z.ZodString
  email: z.ZodString
  message: z.ZodString
}