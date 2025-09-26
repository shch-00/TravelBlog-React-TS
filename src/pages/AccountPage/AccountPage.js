import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useMe } from "../../hooks";
import { ResponsivePageWrapper } from "../../utils/motionConfigurations";
import { useChangePassword, useEditUser } from "../../hooks";
import { Input, Textarea, FileInput } from "../../components/Input";
import { URL_API_IMG } from "../../api/URL_API";
import RetinaImg from "../../components/RetinaImg/RetinaImg";
import BackIcon from "../../assets/icons/Back.svg?react";
import PhotoIcon from "../../assets/icons/Photo.svg?react";
import EditIcon from "../../assets/icons/Edit.svg?react";
import "./AccountPage.css";
const AccountPage = ({ path }) => {
  const { data: user } = useMe();
  const { mutate: editUser } = useEditUser();
  const { mutate: changePassword } = useChangePassword();
  const [validationFormError, setValidationFormError] = useState(false);
  const [validationPasswordError, setValidationPasswordError] = useState(false);
  const avatar = `${URL_API_IMG}${user?.photo}` || "";
  const userName = user?.full_name || "Пользователь";
  const userBio = user?.bio || "Нет информации о пользователе";
  const userAvatar =
    avatar ||
    `https://placehold.co/240/FFA902/black?text=${userName}&font=poppins/jpeg`;
  const userCity = user?.city || "Город не указан";
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    if (data.full_name === "" || data.bio === "" || data.city === "") {
      setValidationFormError(true);
      return;
    } else {
      setValidationFormError(false);
    }
    if (data.password !== "") {
      if (data.password !== data.confirmPassword) {
        setValidationPasswordError(true);
        return;
      }
      changePassword(data.password);
      setValidationPasswordError(false);
    } else {
      setValidationPasswordError(false);
    }
    if (!validationPasswordError && !validationFormError) {
      editUser(data);
    }
  };
  if (path === "account") {
    return _jsx(ResponsivePageWrapper, {
      children: _jsxs("div", {
        className: "account-page",
        children: [
          _jsxs("div", {
            className: "account-page__img-wrapper",
            children: [
              _jsx(RetinaImg, {
                src: userAvatar,
                alt: "user-avatar",
                className: "account-page__user-avatar",
                width: 240,
                height: 240,
              }),
              _jsx(FileInput, {
                name: "photo",
                label:
                  "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u0444\u043E\u0442\u043E",
                className: "account-page__user-avatar-button",
                icon: _jsx(PhotoIcon, {
                  className: "account-page__user-avatar-button-icon",
                }),
              }),
            ],
          }),
          _jsxs("div", {
            className: "account-page__user-info",
            children: [
              _jsx("h2", {
                className: "account-page__user-name",
                children: userName,
              }),
              _jsxs("div", {
                className: "account-page__user-info-inner",
                children: [
                  _jsx("span", {
                    className: "account-page__user-info-label",
                    children: "\u0413\u043E\u0440\u043E\u0434:",
                  }),
                  _jsx("p", {
                    className: "account-page__user-bio",
                    children: userCity,
                  }),
                ],
              }),
              _jsxs("div", {
                className: "account-page__user-info-inner",
                children: [
                  _jsx("span", {
                    className: "account-page__user-info-label",
                    children: "\u041E \u0441\u0435\u0431\u0435:",
                  }),
                  _jsx("p", {
                    className: "account-page__user-bio",
                    children: userBio,
                  }),
                ],
              }),
            ],
          }),
          _jsx(Link, {
            to: "/account-edit",
            className: "account-page__user-edit-button",
            children: _jsx(EditIcon, {
              className: "account-page__user-edit-button-icon",
            }),
          }),
        ],
      }),
    });
  }
  return _jsx(ResponsivePageWrapper, {
    children: _jsx("div", {
      className: "account-page",
      children: _jsxs("form", {
        className: "account-page__form",
        onSubmit: handleSubmit,
        children: [
          _jsxs("div", {
            className: "account-page__img-wrapper",
            children: [
              _jsx(RetinaImg, {
                src: userAvatar,
                alt: "user-avatar",
                className: "account-page__user-avatar",
              }),
              _jsx(FileInput, {
                name: "photo",
                label:
                  "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u0444\u043E\u0442\u043E",
                className: "account-page__user-avatar-button",
                icon: _jsx(PhotoIcon, {
                  className: "account-page__user-avatar-button-icon",
                }),
              }),
            ],
          }),
          _jsxs("div", {
            className: "account-page__form-wrapper",
            children: [
              _jsxs("div", {
                className:
                  "account-page__user-info account-page__user-info--form",
                children: [
                  _jsx(Input, {
                    label: "\u0424\u0418\u041E",
                    name: "full_name",
                    defaultValue: userName,
                    error: validationFormError ? "Введите ФИО" : undefined,
                  }),
                  _jsx(Input, {
                    label: "\u0413\u043E\u0440\u043E\u0434",
                    name: "city",
                    defaultValue: userCity,
                    error: validationFormError ? "Введите город" : undefined,
                  }),
                  _jsx(Textarea, {
                    label: "\u041E \u0441\u0435\u0431\u0435",
                    name: "bio",
                    defaultValue: userBio,
                    error: validationFormError
                      ? "Расскажите о себе"
                      : undefined,
                  }),
                ],
              }),
              _jsxs("div", {
                className: "account-page__password-wrapper",
                children: [
                  _jsx("h2", {
                    className: "account-page__password-title",
                    children:
                      "\u0421\u043C\u0435\u043D\u0430 \u043F\u0430\u0440\u043E\u043B\u044F",
                  }),
                  _jsxs("div", {
                    className: "account-page__password-fields",
                    children: [
                      _jsx(Input, {
                        label:
                          "\u041D\u043E\u0432\u044B\u0439 \u043F\u0430\u0440\u043E\u043B\u044C",
                        name: "password",
                        type: "password",
                        placeholder:
                          "\u041D\u043E\u0432\u044B\u0439 \u043F\u0430\u0440\u043E\u043B\u044C",
                        error: validationPasswordError
                          ? "Пароли не совпадают"
                          : undefined,
                        short: true,
                      }),
                      _jsx(Input, {
                        label:
                          "\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044C \u043F\u0430\u0440\u043E\u043B\u044C",
                        name: "confirmPassword",
                        type: "password",
                        placeholder:
                          "\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044C \u043F\u0430\u0440\u043E\u043B\u044C",
                        error: validationPasswordError
                          ? "Пароли не совпадают"
                          : undefined,
                        short: true,
                      }),
                    ],
                  }),
                ],
              }),
              _jsxs("div", {
                className: "account-page__form-buttons",
                children: [
                  _jsxs(Link, {
                    to: "/account",
                    className: "account-page__from-button btn btn--link",
                    children: [
                      _jsx(BackIcon, {
                        className: "account-page__from-button-icon btn__icon",
                      }),
                      _jsx("span", {
                        children: "\u041D\u0430\u0437\u0430\u0434",
                      }),
                    ],
                  }),
                  _jsx("button", {
                    className: "account-page__from-button btn",
                    type: "submit",
                    children:
                      "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C",
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    }),
  });
};
export default AccountPage;
