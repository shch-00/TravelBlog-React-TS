import { z } from "zod";

const UserLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type UserLogin = z.infer<typeof UserLoginSchema>;

const UserSchema = z.object({
  id: z.string(),
  full_name: z.string().min(3).max(255),
  city: z.string().min(3).max(255),
  country: z.string().min(3).max(255),
  bio: z.string().max(2000),
});

type User = z.infer<typeof UserSchema>;

export { UserLoginSchema, UserLogin, UserSchema, User };
