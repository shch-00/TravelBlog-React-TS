import { FC } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
import { useLogin, useRegister } from "../../hooks";
import { useAddPost } from "../../hooks/posts";
import Input from "../Input/Input";
import Textarea from "../Input/Textarea";
import FileInput from "../Input/FileInput";
import BackIcon from "../../assets/icons/Back.svg?react";
import UploadIcon from "../../assets/icons/Upload.svg?react";
import "./UserForm.css";

interface UserFormProps {
  title: "login" | "register" | "create-post" | "add-comment";
}

const UserForm: FC<UserFormProps> = ({ title }) => {
  const location = useLocation();
  const postId = location.pathname.split("/")[2];

  const { mutate: addPost, isPending: isAddPostPending } = useAddPost();

  const navigate = useNavigate();

  const {
    mutate: login,
    isError: isLoginError,
    isPending: isLoginPending,
    error: loginError,
  } = useLogin();

  const {
    mutate: register,
    isError: isRegisterError,
    isPending: isRegisterPending,
  } = useRegister();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    if (title === "create-post") {
      addPost(data);
    }

    if (title === "login") {
      login(
        {
          email: data.email as string,
          password: data.password as string,
        },
        {
          onSuccess: () => {
            navigate("/");
          },
        }
      );

      if (isLoginError) {
        console.error(loginError?.message);
      }
    }

    if (title === "register") {
      if (data.password !== data.confirmPassword) {
        console.log("Пароли не совпадают");
        return;
      }

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
        console.error("Ошибка при регистрации");
      }
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

  if (title === "add-comment") {
    return (
      <div className="user-form">
        <h1 className="user-form__title">Добавление отзыва</h1>
        <form className="user-form__form" onSubmit={handleSubmit}>
          <Input
            name="full_name"
            placeholder="Ваше имя"
            label="Ваше имя"
            required
          />
          <Textarea
            name="comment"
            placeholder="Добавьте текст отзыва"
            label="Отзыв"
            required
          />
          <div className="user-form__buttons">
            <Link
              to={`/${postId}`}
              className="user-form__button user-form__button--link btn btn--link"
            >
              <BackIcon className="user-form__button-icon btn__icon" />
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

  if (title === "create-post") {
    return (
      <div className="user-form">
        <h1 className="user-form__title">Добавление истории о путешествии</h1>
        <form className="user-form__form" onSubmit={handleSubmit}>
          <FileInput
            name="photo"
            required
            icon={<UploadIcon className="user-form__button-icon" />}
          />
          <Input
            name="title"
            placeholder="Заголовок"
            label="Заголовок"
            required
          />
          <Input
            name="country"
            placeholder="Страна"
            label="Страна"
            required
            short
          />
          <Input name="city" placeholder="Город" label="Город" required short />
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
              <BackIcon className="user-form__button-icon btn__icon" />
              <span>Назад</span>
            </Link>
            <button
              className="user-form__button btn"
              type="submit"
              disabled={isAddPostPending}
            >
              {isAddPostPending ? "Сохраняем..." : "Сохранить"}
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
            <button
              className="user-form__button btn"
              type="submit"
              disabled={isLoginPending}
            >
              {isLoginPending ? "Войти..." : "Войти"}
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
          <button
            className="user-form__button btn"
            type="submit"
            disabled={isRegisterPending}
          >
            {isRegisterPending ? "Зарегистрироваться..." : "Зарегистрироваться"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
