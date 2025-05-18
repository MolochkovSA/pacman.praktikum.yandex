import { z } from 'zod';

export const UserDto = z.object({
  id: z.number(),
  first_name: z.string(),
  second_name: z.string(),
  display_name: z.string(),
  phone: z.string(),
  login: z.string(),
  avatar: z.string(),
  email: z.string()
});
