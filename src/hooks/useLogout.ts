import { useMutation, useQueryClient } from "@tanstack/react-query";
import URL_API from "../api/URL_API";

async function logout() {
  const response = await fetch(`${URL_API}/logout`);

  if (!response.ok) {
    throw new Error("Failed to logout");
  }

  const data = await response.json();
  localStorage.removeItem("token");
  return data;
}

const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
      setTimeout(() => {
        window.location.reload();
      }, 300);
    },
  });
};

export default useLogout;
