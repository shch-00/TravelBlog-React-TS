import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegister } from "../../hooks";
import validateEmail from "../../utils/validateEmail";
import { Input } from "../Input";
const RegisterForm = () => {
  const [validationError, setValidationError] = useState(false);
  const [validationPassError, setValidationPassError] = useState(false);
  const navigate = useNavigate();
  const submitRef = useRef(null);
  const [registretionError, setRegistretionError] = useState("");
  const {
    mutate: register,
    isError: isRegisterError,
    isPending: isRegisterPending,
  } = useRegister();
  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError(false);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    for (const [key, value] of formData) {
      if (value === "") {
        if (key === "email") {
          setRegistretionError("Введите Email");
        }
        setValidationError(true);
        return;
      }
      if (key === "email" && !validateEmail(value)) {
        setRegistretionError("Введите корректный Email");
      }
      setValidationError(false);
    }
    if (data.password !== data.confirmPassword) {
      setValidationPassError(true);
      return;
    } else {
      setValidationPassError(false);
    }
    if (!validationError && !validationPassError) {
      register(
        {
          email: data.email,
          password: data.password,
          confirmPassword: data.confirmPassword,
        },
        {
          onSuccess: () => {
            navigate("/login");
          },
        }
      );
      if (isRegisterError) {
        setRegistretionError("Аккаунт с данным Email уже существует");
      }
    }
  };
  return _jsxs("div", {
    className: "user-form",
    children: [
      _jsx("h1", {
        className: "user-form__title",
        children:
          "\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F",
      }),
      _jsxs("form", {
        className: "user-form__form",
        onSubmit: handleSubmit,
        children: [
          _jsx(Input, {
            name: "email",
            placeholder: "Email",
            type: "email",
            label: "Email",
            error: validationError ? registretionError : undefined,
          }),
          _jsx(Input, {
            name: "password",
            placeholder: "\u041F\u0430\u0440\u043E\u043B\u044C",
            type: "password",
            label: "\u041F\u0430\u0440\u043E\u043B\u044C",
            short: true,
            error: validationPassError ? "Пароли не совпадают" : undefined,
          }),
          _jsx(Input, {
            name: "confirmPassword",
            placeholder:
              "\u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u0435 \u043F\u0430\u0440\u043E\u043B\u044C",
            type: "password",
            label:
              "\u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u0435 \u043F\u0430\u0440\u043E\u043B\u044C",
            short: true,
            error: validationPassError ? "Пароли не совпадают" : undefined,
          }),
          _jsxs("div", {
            className: "user-form__buttons",
            children: [
              _jsx(Link, {
                to: "/login",
                className:
                  "user-form__button btn user-form__button--link btn--link",
                children: "\u0412\u0445\u043E\u0434",
              }),
              _jsx("button", {
                className: "user-form__button btn",
                type: "submit",
                disabled: isRegisterPending,
                ref: submitRef,
                children: isRegisterPending
                  ? "Зарегистрироваться..."
                  : "Зарегистрироваться",
              }),
            ],
          }),
        ],
      }),
    ],
  });
};
export default RegisterForm;
