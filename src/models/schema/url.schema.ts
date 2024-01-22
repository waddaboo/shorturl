import { z } from 'zod';

export const urlSchema = z.object({
  id: z.string().optional(),
  shortUrl: z.string().optional(),
  targetUrl: z.string().url(),
  title: z.string().optional(),
  clicks: z.number().optional(),
});

export type UrlType = z.infer<typeof urlSchema>;
