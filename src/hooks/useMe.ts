import { useQuery } from "@tanstack/react-query";
import { User } from "../types/User";
import URL_API from "../api/URL_API";

async function fetchMe() {
  const response = await fetch(`${URL_API}/user`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }

  const data = await response.json();
  return data;
}

const useMe = () => {
  return useQuery<User>({
    queryKey: ["me"],
    queryFn: fetchMe,
  });
};

export default useMe;
