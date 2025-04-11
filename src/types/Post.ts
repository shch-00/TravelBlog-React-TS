import { z } from "zod";
import { CommentSchema } from "./Comment";

const PhotoFileSchema = z.instanceof(File).optional();
const PhotoStringSchema = z.string().optional();

const PostSchema = z.object({
  id: z.number().optional(),
  title: z.string().optional(),
  excerpt: z.string().optional(),
  photo: PhotoFileSchema || PhotoStringSchema,
  description: z.string().optional(),
  county: z.string().optional(),
  city: z.string().optional(),
  comments: z.array(CommentSchema).optional(),
});

const PostListSchema = z.array(PostSchema);

type Post = z.infer<typeof PostSchema>;
type Posts = z.infer<typeof PostListSchema>;

export default Post;
export { PostSchema, Posts, PostListSchema };
