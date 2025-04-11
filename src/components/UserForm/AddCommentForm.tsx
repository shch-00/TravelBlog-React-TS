import { useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAddComment } from "../../hooks";
import { Input, Textarea } from "../Input";
import BackIcon from "../../assets/icons/Back.svg?react";

const AddCommentForm = () => {
  const [validationError, setValidationError] = useState(false);
  const submitRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  const postId = location.pathname.split("/")[2];
  const navigate = useNavigate();

  const { mutate: addComment, isPending: isAddCommentPending } =
    useAddComment();

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
      addComment(
        {
          postId: Number(postId),
          comment: {
            full_name: data.full_name as string,
            comment: data.comment as string,
          },
        },
        {
          onSuccess: () => navigate(`/${postId}`),
        }
      );
    }
  };

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
          <button
            className="user-form__button btn"
            type="submit"
            disabled={isAddCommentPending}
            ref={submitRef}
          >
            {isAddCommentPending ? "Сохраняем..." : "Сохранить"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCommentForm;
