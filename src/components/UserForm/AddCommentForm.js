import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAddComment } from "../../hooks";
import { Input, Textarea } from "../Input";
import BackIcon from "../../assets/icons/Back.svg?react";
const AddCommentForm = () => {
  const [validationError, setValidationError] = useState(false);
  const submitRef = useRef(null);
  const location = useLocation();
  const postId = location.pathname.split("/")[2];
  const navigate = useNavigate();
  const { mutate: addComment, isPending: isAddCommentPending } =
    useAddComment();
  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError(false);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    for (const [key, value] of formData) {
      if (key && value === "") {
        setValidationError(true);
        return;
      }
      setValidationError(false);
    }
    if (!validationError) {
      addComment(
        {
          postId: Number(postId),
          comment: {
            full_name: data.full_name,
            comment: data.comment,
          },
        },
        {
          onSuccess: () => navigate(`/${postId}`),
        }
      );
    }
  };
  return _jsxs("div", {
    className: "user-form",
    children: [
      _jsx("h1", {
        className: "user-form__title",
        children:
          "\u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u043E\u0442\u0437\u044B\u0432\u0430",
      }),
      _jsxs("form", {
        className: "user-form__form",
        onSubmit: handleSubmit,
        children: [
          _jsx(Input, {
            name: "full_name",
            placeholder: "\u0412\u0430\u0448\u0435 \u0438\u043C\u044F",
            label: "\u0412\u0430\u0448\u0435 \u0438\u043C\u044F",
            required: true,
          }),
          _jsx(Textarea, {
            name: "comment",
            placeholder:
              "\u0414\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u0442\u0435\u043A\u0441\u0442 \u043E\u0442\u0437\u044B\u0432\u0430",
            label: "\u041E\u0442\u0437\u044B\u0432",
            required: true,
          }),
          _jsxs("div", {
            className: "user-form__buttons",
            children: [
              _jsxs(Link, {
                to: `/${postId}`,
                className:
                  "user-form__button user-form__button--link btn btn--link",
                children: [
                  _jsx(BackIcon, {
                    className: "user-form__button-icon btn__icon",
                  }),
                  _jsx("span", { children: "\u041D\u0430\u0437\u0430\u0434" }),
                ],
              }),
              _jsx("button", {
                className: "user-form__button btn",
                type: "submit",
                disabled: isAddCommentPending,
                ref: submitRef,
                children: isAddCommentPending ? "Сохраняем..." : "Сохранить",
              }),
            ],
          }),
        ],
      }),
    ],
  });
};
export default AddCommentForm;
