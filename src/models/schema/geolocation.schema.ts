import { z } from 'zod';

export const geolocationSchema = z.object({
  id: z.string().optional(),
  urlId: z.string().optional(),
  ip: z.string().optional(),
  country: z.string().optional(),
  country_name: z.string().optional(),
  city: z.string().optional(),
  region: z.string().optional(),
  postal: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  timezone: z.string().optional(),
});

export type GeolocationType = z.infer<typeof geolocationSchema>;
