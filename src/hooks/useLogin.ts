import { useMutation } from "@tanstack/react-query";
import { UserLogin, UserLoginSchema } from "../types/User";
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
  return UserLoginSchema.parse(data);
}

const useLogin = () => {
  return useMutation<UserLogin, Error, UserLogin>({
    mutationFn: (user: UserLogin) => login(user),
  });
};

export default useLogin;
