import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAddPost } from "../../hooks";
import { Input, Textarea, FileInput } from "../Input";
import BackIcon from "../../assets/icons/Back.svg?react";
import UploadIcon from "../../assets/icons/Upload.svg?react";

const CreatePostForm = () => {
  const [validationError, setValidationError] = useState(false);
  const submitRef = useRef<HTMLButtonElement>(null);

  const { mutate: addPost, isPending: isAddPostPending } = useAddPost();

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

    if (!validationError) {
      addPost(data);
    }
  };

  return (
    <div className="user-form">
      <h1 className="user-form__title">Добавление истории о путешествии</h1>
      <form className="user-form__form" onSubmit={handleSubmit}>
        <FileInput
          name="photo"
          icon={<UploadIcon className="user-form__button-icon" />}
          error={validationError ? "Выберите файл" : undefined}
        />
        <Input
          name="title"
          placeholder="Заголовок"
          label="Заголовок"
          error={validationError ? "Напишите заголовок" : undefined}
        />
        <Input
          name="county"
          placeholder="Страна"
          label="Страна"
          short
          error={validationError ? "Напишите название страны" : undefined}
        />
        <Input
          name="city"
          placeholder="Город"
          label="Город"
          short
          error={validationError ? "Напишите название города" : undefined}
        />
        <Textarea
          name="description"
          placeholder="Добавьте описание вашей истории"
          label="Описание"
          error={validationError ? "Добавьте описание" : undefined}
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
            ref={submitRef}
          >
            {isAddPostPending ? "Сохраняем..." : "Сохранить"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePostForm;
