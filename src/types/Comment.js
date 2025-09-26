import { z } from "zod";
const CommentSchema = z.object({
  id: z.number().optional(),
  post_id: z.number().optional(),
  author_name: z.string().optional(),
  comment: z.string().optional(),
  created_at: z.string().datetime().optional(),
  full_name: z.string().optional(),
});
const CommentListSchema = z.array(CommentSchema);
export { CommentSchema, CommentListSchema };
