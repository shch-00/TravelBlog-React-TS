import { z } from "zod";
const PhotoFileSchema = z.instanceof(File).optional();
const PhotoStringSchema = z.string().optional();
export { PhotoFileSchema, PhotoStringSchema };
