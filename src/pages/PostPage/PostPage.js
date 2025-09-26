import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { usePost } from "../../hooks/posts";
import { useComments } from "../../hooks/comments";
import { ResponsivePageWrapper } from "../../utils/motionConfigurations";
import { URL_API_IMG } from "../../api/URL_API";
import CommentsList from "../../components/CommentsList";
import BackIcon from "../../assets/icons/Back.svg?react";
import "./PostPage.css";
const PostPage = () => {
  const { id } = useParams();
  const { data: post, isLoading: isPostLoading } = usePost(Number(id));
  const { data: comments, isLoading: isCommentsLoading } = useComments(
    Number(id)
  );
  const containerRef = useRef(null);
  const isLogged = Boolean(localStorage.getItem("token"));
  const postImage = `${URL_API_IMG}${post?.photo}` || "";
  if (isPostLoading) {
    return _jsx("div", { children: "Loading..." });
  }
  return _jsx(ResponsivePageWrapper, {
    children: _jsxs("div", {
      className: "post-page",
      ref: containerRef,
      children: [
        _jsx("img", {
          src: postImage
            ? postImage
            : `https://placehold.co/1200x450?text=${post?.title}`,
          alt: post?.title,
          className: "post-page__image",
        }),
        _jsxs("div", {
          className: "post-page__content",
          children: [
            _jsxs("div", {
              className: "post-page__inner",
              children: [
                _jsx("h2", {
                  className: "post-page__title",
                  children: post?.title,
                }),
                _jsx("p", {
                  className: "post-page__description",
                  children: post?.description,
                }),
              ],
            }),
            isCommentsLoading
              ? _jsx("div", { children: "Loading..." })
              : comments &&
                comments.length > 0 &&
                _jsx(CommentsList, { comments: comments }),
            _jsxs("div", {
              className: "post-page__buttons",
              children: [
                _jsxs(Link, {
                  className: "post-page__button btn btn--link",
                  to: "/",
                  children: [
                    _jsx(BackIcon, {
                      className: "post-page__button-icon btn__icon",
                    }),
                    _jsx("span", {
                      children: "\u041D\u0430\u0437\u0430\u0434",
                    }),
                  ],
                }),
                isLogged
                  ? _jsx(Link, {
                      className: "post-page__button btn",
                      to: `/add-comment/${id}`,
                      children:
                        "\u0412\u0430\u0448\u0435 \u0432\u043F\u0435\u0447\u0430\u0442\u043B\u0435\u043D\u0438\u0435 \u043E\u0431 \u044D\u0442\u043E\u043C \u043C\u0435\u0441\u0442\u0435",
                    })
                  : null,
              ],
            }),
          ],
        }),
      ],
    }),
  });
};
export default PostPage;
