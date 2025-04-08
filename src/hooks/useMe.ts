import { useQuery } from "@tanstack/react-query";
import { User, UserSchema } from "../types/User";

async function fetchMe() {
  const response = await fetch("https://travelblog.skillbox.cc/api/user", {
    credentials: "include",
    method: "GET",
  });
  const data = await response.json();
  return UserSchema.parse(data);
}

const useMe = () => {
  return useQuery<User>({
    queryKey: ["me"],
    queryFn: fetchMe,
  });
};

export default useMe;
