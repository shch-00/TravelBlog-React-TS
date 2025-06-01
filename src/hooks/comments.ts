import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type Comment from "../types/Comment";
import URL_API from "../api/URL_API";

async function getComments(postId: number) {
  const response = await fetch(`${URL_API}/posts/${postId}/comments`);
  const data = await response.json();
  return data;
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
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}

const useAddComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId, comment }: { postId: number; comment: Comment }) =>
      addComment(postId, comment),
    onSuccess: ({ postId }: { postId: number }) => {
      queryClient.resetQueries({ queryKey: ["comments", postId] });
    },
  });
};

export { useComments, useAddComment };
