import { baseSchema } from './baseSchema';

export const profileSchema = baseSchema.omit({
  password: true,
  password_two: true
});
