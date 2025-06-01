import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserLogin } from "../types/User";
import URL_API from "../api/URL_API";

async function login(user: UserLogin) {
  const response = await fetch(`${URL_API}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error("Failed to login");
  }

  const data = await response.json();
  localStorage.setItem("token", data.token);
  return data;
}

const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (user: UserLogin) => login(user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
};

export default useLogin;
