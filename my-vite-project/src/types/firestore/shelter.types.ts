import { z } from 'zod';

export const ShelterSchema = z.object({
  id: z.string(),
  score: z.number(),
  coordinates: z.object({ longitude: z.number(), latitude: z.number() }),
});

export type Shelter = z.infer<typeof ShelterSchema>;

export const parseShelter = (value: unknown): Shelter =>
  ShelterSchema.parse(value);
