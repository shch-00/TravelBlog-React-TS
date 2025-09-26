import { useQuery, useMutation } from "@tanstack/react-query";
import URL_API from "../api/URL_API";
async function getPosts() {
  const response = await fetch(`${URL_API}/posts`);
  const data = await response.json();
  return data;
}
const usePosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });
};
async function addPost(post) {
  const formData = new FormData();
  formData.append("title", post.title);
  formData.append("description", post.description);
  formData.append("country", post.county);
  formData.append("city", post.city);
  formData.append("photo", post.photo);
  const response = await fetch(`${URL_API}/posts`, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const data = await response.json();
  return data;
}
const useAddPost = () => {
  return useMutation({
    mutationFn: addPost,
  });
};
async function getPost(id) {
  const response = await fetch(`${URL_API}/posts/${id}`);
  const data = await response.json();
  return data;
}
const usePost = (id) => {
  return useQuery({
    queryKey: ["post", id],
    queryFn: () => getPost(id),
  });
};
export { usePosts, useAddPost, usePost };
