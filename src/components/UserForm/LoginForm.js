import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks";
import { motion } from "framer-motion";
import { Input } from "../Input";
const LoginForm = () => {
  const [validationError, setValidationError] = useState(false);
  const navigate = useNavigate();
  const submitRef = useRef(null);
  const {
    mutate: login,
    isError: isLoginError,
    isPending: isLoginPending,
    error: loginError,
  } = useLogin();
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
    login(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => {
          navigate("/");
          window.location.reload();
        },
      }
    );
    if (isLoginError) {
      console.error(loginError?.message);
    }
  };
  return _jsxs("div", {
    className: "user-form",
    children: [
      _jsx("h1", {
        className: "user-form__title",
        children:
          "\u0412\u0445\u043E\u0434 \u0432 \u043F\u0440\u043E\u0444\u0438\u043B\u044C",
      }),
      _jsx(motion.p, {
        initial: { opacity: 0 },
        animate: { opacity: validationError ? 1 : 0 },
        transition: { duration: 0.3 },
        className: "user-form__error",
      }),
      _jsxs("form", {
        className: "user-form__form",
        onSubmit: handleSubmit,
        children: [
          _jsx(Input, {
            name: "email",
            placeholder: "Email",
            type: "email",
            label: "\u041B\u043E\u0433\u0438\u043D",
            required: true,
          }),
          _jsx(Input, {
            name: "password",
            placeholder: "\u041F\u0430\u0440\u043E\u043B\u044C",
            type: "password",
            label: "\u041F\u0430\u0440\u043E\u043B\u044C",
            required: true,
          }),
          _jsxs("div", {
            className: "user-form__buttons",
            children: [
              _jsx(Link, {
                to: "/register",
                className:
                  "user-form__button user-form__button--link btn btn--link",
                children:
                  "\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F",
              }),
              _jsx("button", {
                className: "user-form__button btn",
                type: "submit",
                disabled: isLoginPending,
                ref: submitRef,
                children: isLoginPending ? "Войти..." : "Войти",
              }),
            ],
          }),
        ],
      }),
    ],
  });
};
export default LoginForm;
