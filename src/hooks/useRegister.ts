import { useMutation } from "@tanstack/react-query";
import { UserLogin } from "../types/User";

async function register(user: UserLogin) {
  const response = await fetch("https://travelblog.skillbox.cc/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error("Failed to register");
  }

  const data = await response.json();
  console.log(data);
  return data;
}

const useRegister = () => {
  return useMutation({
    mutationFn: (user: UserLogin) => register(user),
  });
};

export default useRegister;
