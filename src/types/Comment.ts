import { z } from "zod";

const CommentSchema = z.object({
  id: z.number().optional(),
  post_id: z.number().optional(),
  author_name: z.string(),
  comment: z.string(),
  created_at: z.string().datetime(),
});

const CommentListSchema = z.array(CommentSchema);

type Comment = z.infer<typeof CommentSchema>;
type Comments = z.infer<typeof CommentListSchema>;

export default Comment;
export { CommentSchema, Comments, CommentListSchema };
