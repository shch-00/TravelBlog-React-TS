import { jsx as _jsx } from "react/jsx-runtime";
import AddCommentForm from "./AddCommentForm";
import CreatePostForm from "./CreatePostForm";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import "./style.css";
const UserForm = ({ title }) => {
  if (title === "add-comment") {
    return _jsx(AddCommentForm, {});
  }
  if (title === "create-post") {
    return _jsx(CreatePostForm, {});
  }
  if (title === "login") {
    return _jsx(LoginForm, {});
  }
  return _jsx(RegisterForm, {});
};
export default UserForm;
