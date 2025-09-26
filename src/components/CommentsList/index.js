import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./CommentsList.css";
const CommentsList = ({ comments }) => {
  return _jsx("ul", {
    className: "comments-list",
    children: comments.map((comment, index) =>
      _jsxs(
        "li",
        {
          className: "comments-list__item",
          children: [
            _jsxs("div", {
              className: "comments-list__author",
              children: [
                _jsx("h3", {
                  className: "comments-list__author-name",
                  children: comment.author_name,
                }),
                _jsx("p", {
                  className: "comments-list__author-date",
                  children:
                    comment.created_at &&
                    new Date(comment.created_at).toLocaleDateString(),
                }),
              ],
            }),
            _jsx("p", {
              className: "comments-list__comment",
              children: comment.comment,
            }),
          ],
        },
        comment.id ? comment.id : index
      )
    ),
  });
};
export default CommentsList;
