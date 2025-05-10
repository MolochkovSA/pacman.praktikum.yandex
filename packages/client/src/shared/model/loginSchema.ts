import { baseSchema } from './baseSchema';

export const loginSchema = baseSchema.pick({
  login: true,
  password: true
});
