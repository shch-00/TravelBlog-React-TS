import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import URL_API from "../api/URL_API";
async function getComments(postId) {
  const response = await fetch(`${URL_API}/posts/${postId}/comments`);
  const data = await response.json();
  return data;
}
const useComments = (postId) => {
  return useQuery({
    queryKey: ["comments", postId],
    queryFn: () => getComments(postId),
  });
};
async function addComment(postId, comment) {
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
    mutationFn: ({ postId, comment }) => addComment(postId, comment),
    onSuccess: ({ postId }) => {
      queryClient.resetQueries({ queryKey: ["comments", postId] });
    },
  });
};
export { useComments, useAddComment };
