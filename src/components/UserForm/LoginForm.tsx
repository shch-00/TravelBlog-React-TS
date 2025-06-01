import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks";
import { motion } from "framer-motion";
import { Input } from "../Input";

const LoginForm = () => {
  const [validationError, setValidationError] = useState(false);
  const navigate = useNavigate();
  const submitRef = useRef<HTMLButtonElement>(null);
  const {
    mutate: login,
    isError: isLoginError,
    isPending: isLoginPending,
    error: loginError,
  } = useLogin();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValidationError(false);

    const formData = new FormData(e.target as HTMLFormElement);
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
        email: data.email as string,
        password: data.password as string,
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

  return (
    <div className="user-form">
      <h1 className="user-form__title">Вход в профиль</h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: validationError ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="user-form__error"
      ></motion.p>
      <form className="user-form__form" onSubmit={handleSubmit}>
        <Input
          name="email"
          placeholder="Email"
          type="email"
          label="Логин"
          required
        />
        <Input
          name="password"
          placeholder="Пароль"
          type="password"
          label="Пароль"
          required
        />
        <div className="user-form__buttons">
          <Link
            to="/register"
            className="user-form__button user-form__button--link btn btn--link"
          >
            Регистрация
          </Link>
          <button
            className="user-form__button btn"
            type="submit"
            disabled={isLoginPending}
            ref={submitRef}
          >
            {isLoginPending ? "Войти..." : "Войти"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
