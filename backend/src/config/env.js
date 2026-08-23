import dotenv from 'dotenv';
import z from 'zod';
dotenv.config();

const envSchema = z.object({
    PORT: z.string().transform(Number),
    DB_URI: z.string(),
    DB_NAME: z.string(),
    CLIENT_URL:z.string(),
})

export const ENV = envSchema.parse(process.env);