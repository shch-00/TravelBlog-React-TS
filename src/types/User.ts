import { z } from "zod";
import { PhotoFileSchema, PhotoStringSchema } from "./Photo";

const UserLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8).optional(),
});

type UserLogin = z.infer<typeof UserLoginSchema>;

const UserSchema = z.object({
  id: z.string().optional(),
  full_name: z.string().min(3).max(255).optional(),
  city: z.string().min(3).max(255).optional(),
  country: z.string().min(3).max(255).optional(),
  bio: z.string().max(2000).optional(),
  photo: PhotoFileSchema || PhotoStringSchema,
});

type User = z.infer<typeof UserSchema>;

export { UserLoginSchema, UserLogin, UserSchema, User };
