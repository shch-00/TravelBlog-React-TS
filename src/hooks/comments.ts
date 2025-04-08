import { useMutation, useQuery } from "@tanstack/react-query";
import { CommentListSchema, CommentSchema } from "../types/Comment";
import URL_API from "../api/URL_API";

async function getComments(postId: number) {
  const response = await fetch(`${URL_API}/posts/${postId}/comments`);
  const data = await response.json();
  return CommentListSchema.parse(data);
}

const useComments = (postId: number) => {
  return useQuery({
    queryKey: ["comments", postId],
    queryFn: () => getComments(postId),
  });
};

async function addComment(postId: number, comment: Comment) {
  const response = await fetch(`${URL_API}/posts/${postId}/comments`, {
    method: "POST",
    body: JSON.stringify(comment),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return CommentSchema.parse(data);
}

const useAddComment = () => {
  return useMutation({
    mutationFn: ({ postId, comment }: { postId: number; comment: Comment }) =>
      addComment(postId, comment),
  });
};

export { useComments, useAddComment };
