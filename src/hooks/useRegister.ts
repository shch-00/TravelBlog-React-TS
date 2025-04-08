import { useMutation } from "@tanstack/react-query";
import User from "src/types/User";

async function register(user: User) {
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
    mutationFn: (user: User) => register(user),
  });
};

export default useRegister;
