import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useColorMode } from "../../contexts/ColorModeContext";
import { Link } from "react-router-dom";
import { URL_API_IMG } from "../../api/URL_API";
import RetinaImg from "../RetinaImg/RetinaImg";
import "./PostCard.css";
const PostCard = ({ post }) => {
  const { colorMode: storedColorMode } = useColorMode();
  const colorMode = localStorage.getItem("colorMode") || storedColorMode;
  const photo = post.photo
    ? post.photo
    : "https://placehold.co/370x300/FFA902/black?text=${post.title}&font=poppins/jpeg";
  return _jsxs("div", {
    className: `post-card ${colorMode === "dark" ? "post-card--dark" : ""}`,
    children: [
      _jsx("div", {
        className: "post-card__img-content",
        children: _jsx(RetinaImg, {
          src: post.photo ? `${URL_API_IMG}${photo}` : photo,
          alt: post.title,
          width: 370,
          height: 300,
          className: "post-card__img",
        }),
      }),
      _jsxs("div", {
        className: "post-card__content",
        children: [
          _jsxs("div", {
            className: "post-card__inner-top",
            children: [
              _jsx("h3", {
                className: "post-card__title",
                children: post.title,
              }),
              _jsx("p", {
                className: "post-card__excerpt",
                children: post.excerpt,
              }),
            ],
          }),
          _jsxs("div", {
            className: "post-card__inner-bottom",
            children: [
              _jsx("span", {
                className: "post-card__place",
                children: `${post.county ? post.county + ", " : ""}${post.city ? post.city : ""}`,
              }),
              _jsx(Link, {
                to: `/${post?.id}`,
                className: "post-card__link",
                children:
                  "\u041F\u043E\u0434\u0440\u043E\u0431\u043D\u0435\u0435",
              }),
            ],
          }),
        ],
      }),
    ],
  });
};
export default PostCard;
