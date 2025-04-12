import { z } from "zod";
import { CommentSchema } from "./Comment";
import { PhotoFileSchema, PhotoStringSchema } from "./Photo";

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
