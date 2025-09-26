import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { usePosts } from "../../hooks/posts";
import { ResponsivePageWrapper } from "../../utils/motionConfigurations";
import { Link } from "react-router-dom";
import PostCard from "../../components/PostCard/PostCard";
import "./HomePage.css";
const HomePage = () => {
  const { data: posts, isLoading } = usePosts();
  const isLogged = Boolean(localStorage.getItem("token"));
  if (isLoading) {
    return _jsx("div", { children: "Loading..." });
  }
  return _jsx(ResponsivePageWrapper, {
    children: _jsxs("div", {
      className: "home-page",
      children: [
        _jsx("ul", {
          className: "home-page__posts-list",
          children: posts?.map((post) =>
            _jsx(
              "li",
              {
                className: "home-page__post-item",
                children: _jsx(PostCard, { post: post }),
              },
              post.id
            )
          ),
        }),
        isLogged
          ? _jsx(Link, {
              to: "/create-post",
              className: "home-page__button btn",
              style: {},
              children:
                "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043C\u043E\u0435 \u043F\u0443\u0442\u0435\u0448\u0435\u0441\u0442\u0432\u0438\u0435",
            })
          : null,
      ],
    }),
  });
};
export default HomePage;
