import { FC } from "react";
import AddCommentForm from "./AddCommentForm";
import CreatePostForm from "./CreatePostForm";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import "./style.css";

interface UserFormProps {
  title: "login" | "register" | "create-post" | "add-comment";
}

const UserForm: FC<UserFormProps> = ({ title }) => {
  if (title === "add-comment") {
    return <AddCommentForm />;
  }

  if (title === "create-post") {
    return <CreatePostForm />;
  }

  if (title === "login") {
    return <LoginForm />;
  }

  return <RegisterForm />;
};

export default UserForm;
