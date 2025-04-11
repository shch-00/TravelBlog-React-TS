import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegister } from "../../hooks";
import validateEmail from "../../utils/validateEmail";
import { Input } from "../Input";

const RegisterForm = () => {
  const [validationError, setValidationError] = useState(false);
  const [validationPassError, setValidationPassError] = useState(false);
  const navigate = useNavigate();
  const submitRef = useRef<HTMLButtonElement>(null);
  const [registretionError, setRegistretionError] = useState("");

  const {
    mutate: register,
    isError: isRegisterError,
    isPending: isRegisterPending,
  } = useRegister();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValidationError(false);

    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    for (const [key, value] of formData) {
      if (value === "") {
        if (key === "email") {
          setRegistretionError("Введите Email");
        }
        setValidationError(true);
        return;
      }
      if (key === "email" && !validateEmail(value as string)) {
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
          email: data.email as string,
          password: data.password as string,
          confirmPassword: data.confirmPassword as string,
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

  return (
    <div className="user-form">
      <h1 className="user-form__title">Регистрация</h1>
      <form className="user-form__form" onSubmit={handleSubmit}>
        <Input
          name="email"
          placeholder="Email"
          type="email"
          label="Email"
          error={validationError ? registretionError : undefined}
        />
        <Input
          name="password"
          placeholder="Пароль"
          type="password"
          label="Пароль"
          short
          error={validationPassError ? "Пароли не совпадают" : undefined}
        />
        <Input
          name="confirmPassword"
          placeholder="Повторите пароль"
          type="password"
          label="Повторите пароль"
          short
          error={validationPassError ? "Пароли не совпадают" : undefined}
        />
        <div className="user-form__buttons">
          <Link
            to="/login"
            className="user-form__button btn user-form__button--link btn--link"
          >
            Вход
          </Link>
          <button
            className="user-form__button btn"
            type="submit"
            disabled={isRegisterPending}
            ref={submitRef}
          >
            {isRegisterPending ? "Зарегистрироваться..." : "Зарегистрироваться"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
