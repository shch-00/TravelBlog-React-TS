import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAddPost } from "../../hooks";
import { Input, Textarea, FileInput } from "../Input";
import BackIcon from "../../assets/icons/Back.svg?react";
import UploadIcon from "../../assets/icons/Upload.svg?react";
const CreatePostForm = () => {
  const [validationError, setValidationError] = useState(false);
  const submitRef = useRef(null);
  const { mutate: addPost, isPending: isAddPostPending } = useAddPost();
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
      addPost(data);
    }
  };
  return _jsxs("div", {
    className: "user-form",
    children: [
      _jsx("h1", {
        className: "user-form__title",
        children:
          "\u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u0438\u0441\u0442\u043E\u0440\u0438\u0438 \u043E \u043F\u0443\u0442\u0435\u0448\u0435\u0441\u0442\u0432\u0438\u0438",
      }),
      _jsxs("form", {
        className: "user-form__form",
        onSubmit: handleSubmit,
        children: [
          _jsx(FileInput, {
            name: "photo",
            icon: _jsx(UploadIcon, { className: "user-form__button-icon" }),
            error: validationError ? "Выберите файл" : undefined,
          }),
          _jsx(Input, {
            name: "title",
            placeholder:
              "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A",
            label: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A",
            error: validationError ? "Напишите заголовок" : undefined,
          }),
          _jsx(Input, {
            name: "county",
            placeholder: "\u0421\u0442\u0440\u0430\u043D\u0430",
            label: "\u0421\u0442\u0440\u0430\u043D\u0430",
            short: true,
            error: validationError ? "Напишите название страны" : undefined,
          }),
          _jsx(Input, {
            name: "city",
            placeholder: "\u0413\u043E\u0440\u043E\u0434",
            label: "\u0413\u043E\u0440\u043E\u0434",
            short: true,
            error: validationError ? "Напишите название города" : undefined,
          }),
          _jsx(Textarea, {
            name: "description",
            placeholder:
              "\u0414\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u0432\u0430\u0448\u0435\u0439 \u0438\u0441\u0442\u043E\u0440\u0438\u0438",
            label: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435",
            error: validationError ? "Добавьте описание" : undefined,
          }),
          _jsxs("div", {
            className: "user-form__buttons",
            children: [
              _jsxs(Link, {
                to: "/",
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
                disabled: isAddPostPending,
                ref: submitRef,
                children: isAddPostPending ? "Сохраняем..." : "Сохранить",
              }),
            ],
          }),
        ],
      }),
    ],
  });
};
export default CreatePostForm;
