import { z } from 'zod';

export const clockInputSchema = z.object({
  serial: z.string().min(3, 'Serial inválido'),
  location: z.string().min(3, 'Localização inválida'),
  isActive: z.boolean().optional(),
});

export type ClockInputDTO = z.infer<typeof clockInputSchema>;
