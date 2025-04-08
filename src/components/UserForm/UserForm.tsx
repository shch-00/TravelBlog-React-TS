import { FC } from "react";
import { Link } from "react-router-dom";
// import { useForm } from "react-hook-form";
import Input from "../Input/Input";
import Textarea from "../Input/Textarea";
import FileInput from "../Input/FileInput";
import "./UserForm.css";

interface UserFormProps {
  title: "login" | "register" | "create-post";
}

const UserForm: FC<UserFormProps> = ({ title }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    for (const [key, value] of Object.entries(data)) {
      console.log(key, value);
    }

    // if (data.image) {
    //   const file = data.image as File;

    //   // Создаем Blob URL вместо DataURL
    //   const blobUrl = URL.createObjectURL(file);

    //   // Если браузер заблокировал popup, создаем временную ссылку
    //   const a = document.createElement("a");
    //   a.href = blobUrl;
    //   a.target = "_blank";
    //   a.download = file.name; // Опционально: предлагаем скачать
    //   document.body.appendChild(a);
    //   a.click();
    //   document.body.removeChild(a);

    //   // Освобождаем память через некоторое время
    //   setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
    // }
  };

  if (title === "create-post") {
    return (
      <div className="user-form">
        <h1 className="user-form__title">Добавление истории о путешествии</h1>
        <form className="user-form__form" onSubmit={handleSubmit}>
          <FileInput name="photo" required />
          <Input
            name="title"
            placeholder="Заголовок"
            label="Заголовок"
            required
          />
          <Input name="country" placeholder="Страна" label="Страна" required />
          <Input name="city" placeholder="Город" label="Город" required />
          <Textarea
            name="description"
            placeholder="Добавьте описание вашей истории"
            label="Описание"
            required
          />
          <div className="user-form__buttons">
            <Link
              to="/"
              className="user-form__button user-form__button--link btn btn--link"
            >
              <span>Назад</span>
            </Link>
            <button className="user-form__button btn" type="submit">
              Сохранить
            </button>
          </div>
        </form>
      </div>
    );
  }

  if (title === "login") {
    return (
      <div className="user-form">
        <h1 className="user-form__title">Вход в профиль</h1>
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
            <button className="user-form__button btn" type="submit">
              Войти
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="user-form">
      <h1 className="user-form__title">Регистрация</h1>
      <form className="user-form__form" onSubmit={handleSubmit}>
        <Input
          name="email"
          placeholder="Email"
          type="email"
          label="Email"
          required
        />
        <Input
          name="password"
          placeholder="Пароль"
          type="password"
          label="Пароль"
          required
          short
        />
        <Input
          name="confirmPassword"
          placeholder="Повторите пароль"
          type="password"
          label="Повторите пароль"
          required
          short
        />
        <div className="user-form__buttons">
          <Link
            to="/login"
            className="user-form__button btn user-form__button--link btn--link"
          >
            Вход
          </Link>
          <button className="user-form__button btn" type="submit">
            Зарегистрироваться
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
