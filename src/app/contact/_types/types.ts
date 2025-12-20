import { z } from 'zod';

export type ContactType = {
  "name": string,
  "email": string,
  "message": string
}

export type UserSchemaType = {
  "name": z.ZodString,
  "email": z.ZodString,
  "message": z.ZodString
}