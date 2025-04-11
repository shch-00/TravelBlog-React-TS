import { User } from "../types/User";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import URL_API from "../api/URL_API";
import { useNavigate } from "react-router-dom";

async function editUser(user: User) {
  const response = await fetch(`${URL_API}/user`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      full_name: user.full_name,
      city: user.city,
      country: user.country,
      bio: user.bio,
    }),
  });
  const data = await response.json();
  return data;
}

const useEditUser = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: editUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] }).then(() => {
        navigate("/account");
      });
    },
  });
};

export default useEditUser;
