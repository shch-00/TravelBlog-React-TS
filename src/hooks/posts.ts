import { useQuery, useMutation } from "@tanstack/react-query";
import Post, { PostSchema, PostListSchema } from "../types/Post";
import URL_API from "../api/URL_API";

async function getPosts() {
  const response = await fetch(`${URL_API}/posts`);
  const data = await response.json();
  return PostListSchema.parse(data);
}

const usePosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });
};

async function addPost(post: Post) {
  const response = await fetch(`${URL_API}/posts`, {
    method: "POST",
    body: JSON.stringify(post),
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
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

async function getPost(id: number) {
  const response = await fetch(`${URL_API}/posts/${id}`);
  const data = await response.json();
  return PostSchema.parse(data);
}

const usePost = (id: number) => {
  return useQuery({
    queryKey: ["post", id],
    queryFn: () => getPost(id),
  });
};

export { usePosts, useAddPost, usePost };
