import { useMutation, useQueryClient } from "@tanstack/react-query";
import URL_API from "../api/URL_API";
import { useNavigate } from "react-router-dom";
async function editUser(user) {
  const formData = new FormData();
  formData.append("full_name", user.full_name);
  formData.append("city", user.city);
  formData.append("country", user.country);
  formData.append("bio", user.bio);
  formData.append("photo", user.photo);
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
