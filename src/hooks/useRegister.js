import { useMutation } from "@tanstack/react-query";
async function register(user) {
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
  return data;
}
const useRegister = () => {
  return useMutation({
    mutationFn: (user) => register(user),
  });
};
export default useRegister;
