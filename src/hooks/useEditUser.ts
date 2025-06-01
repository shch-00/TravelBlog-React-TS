import { User } from "../types/User";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import URL_API from "../api/URL_API";
import { useNavigate } from "react-router-dom";

async function editUser(user: User) {
  const formData = new FormData();

  formData.append("full_name", user.full_name as string);
  formData.append("city", user.city as string);
  formData.append("country", user.country as string);
  formData.append("bio", user.bio as string);
  formData.append("photo", user.photo as File);

  const response = await fetch(`${URL_API}/user`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: formData,
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
        window.location.reload();
      });
    },
  });
};

export default useEditUser;
