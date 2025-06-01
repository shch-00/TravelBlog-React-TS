import { useMutation } from "@tanstack/react-query";
import URL_API from "../api/URL_API";

async function changePassword(newPassword: string) {
  const response = await fetch(`${URL_API}/user/password`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password: newPassword }),
  });
  const data = await response.json();
  return data;
}

const useChangePassword = () => {
  return useMutation({
    mutationFn: changePassword,
  });
};

export default useChangePassword;
