import { z } from "zod";
import { CommentSchema } from "./Comment";

const PostSchema = z.object({
  id: z.number(),
  title: z.string(),
  excerpt: z.string().optional(),
  photo: z.string(),
  description: z.string().optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  comments: z.array(CommentSchema).optional(),
});

const PostListSchema = z.array(PostSchema);

type Post = z.infer<typeof PostSchema>;
type Posts = z.infer<typeof PostListSchema>;

export default Post;
export { PostSchema, Posts, PostListSchema };
