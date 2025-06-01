import { FC, useState } from "react";
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

interface AccountPageProps {
  path: "account" | "account-edit";
}

const AccountPage: FC<AccountPageProps> = ({ path }) => {
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
      changePassword(data.password as string);
      setValidationPasswordError(false);
    } else {
      setValidationPasswordError(false);
    }

    if (!validationPasswordError && !validationFormError) {
      editUser(data);
    }
  };

  if (path === "account") {
    return (
      <ResponsivePageWrapper>
        <div className="account-page">
          <div className="account-page__img-wrapper">
            <RetinaImg
              src={userAvatar}
              alt="user-avatar"
              className="account-page__user-avatar"
              width={240}
              height={240}
            />
            <FileInput
              name="photo"
              label="Изменить фото"
              className="account-page__user-avatar-button"
              icon={
                <PhotoIcon className="account-page__user-avatar-button-icon" />
              }
            />
          </div>
          <div className="account-page__user-info">
            <h2 className="account-page__user-name">{userName}</h2>
            <div className="account-page__user-info-inner">
              <span className="account-page__user-info-label">Город:</span>
              <p className="account-page__user-bio">{userCity}</p>
            </div>
            <div className="account-page__user-info-inner">
              <span className="account-page__user-info-label">О себе:</span>
              <p className="account-page__user-bio">{userBio}</p>
            </div>
          </div>
          <Link to="/account-edit" className="account-page__user-edit-button">
            <EditIcon className="account-page__user-edit-button-icon" />
          </Link>
        </div>
      </ResponsivePageWrapper>
    );
  }

  return (
    <ResponsivePageWrapper>
      <div className="account-page">
        <form className="account-page__form" onSubmit={handleSubmit}>
          <div className="account-page__img-wrapper">
            <RetinaImg
              src={userAvatar}
              alt="user-avatar"
              className="account-page__user-avatar"
            />
            <FileInput
              name="photo"
              label="Изменить фото"
              className="account-page__user-avatar-button"
              icon={
                <PhotoIcon className="account-page__user-avatar-button-icon" />
              }
            />
          </div>
          <div className="account-page__form-wrapper">
            <div className="account-page__user-info account-page__user-info--form">
              <Input
                label="ФИО"
                name="full_name"
                defaultValue={userName}
                error={validationFormError ? "Введите ФИО" : undefined}
              />
              <Input
                label="Город"
                name="city"
                defaultValue={userCity}
                error={validationFormError ? "Введите город" : undefined}
              />
              <Textarea
                label="О себе"
                name="bio"
                defaultValue={userBio}
                error={validationFormError ? "Расскажите о себе" : undefined}
              />
            </div>
            <div className="account-page__password-wrapper">
              <h2 className="account-page__password-title">Смена пароля</h2>
              <div className="account-page__password-fields">
                <Input
                  label="Новый пароль"
                  name="password"
                  type="password"
                  placeholder="Новый пароль"
                  error={
                    validationPasswordError ? "Пароли не совпадают" : undefined
                  }
                  short
                />
                <Input
                  label="Подтвердить пароль"
                  name="confirmPassword"
                  type="password"
                  placeholder="Подтвердить пароль"
                  error={
                    validationPasswordError ? "Пароли не совпадают" : undefined
                  }
                  short
                />
              </div>
            </div>
            <div className="account-page__form-buttons">
              <Link
                to="/account"
                className="account-page__from-button btn btn--link"
              >
                <BackIcon className="account-page__from-button-icon btn__icon" />
                <span>Назад</span>
              </Link>
              <button className="account-page__from-button btn" type="submit">
                Сохранить
              </button>
            </div>
          </div>
        </form>
      </div>
    </ResponsivePageWrapper>
  );
};

export default AccountPage;
