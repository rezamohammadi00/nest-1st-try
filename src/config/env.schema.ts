import { z } from 'zod';

export type Env = z.infer<typeof envSchema>;
export const envSchema = z.object({
  //APP
  NODE_ENV: z.enum(['development', 'production']),
  PORT: z.coerce.number(),
  //DB
  DB_HOST: z.string().min(1),
  DB_PORT: z.coerce.number(),
  DB_USERNAME: z.string().min(1),
  DB_PASSWORD: z.string().min(1),
  DB_NAME: z.string().min(1),
  //JWT
  JWT_SECRET: z.string().min(32),
  JWT_TTL: z.string().min(1),
});
