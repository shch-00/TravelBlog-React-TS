import { motion, AnimatePresence } from "framer-motion";
import { FC, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useColorMode } from "../../contexts/ColorModeContext";
import { useMe } from "../../hooks";
import { URL_API_IMG } from "../../api/URL_API";
import TriangleIcon from "../../assets/icons/triangle.svg?react";
import RetinaImg from "../RetinaImg/RetinaImg";
import LogoIcon from "../../assets/logo.svg?react";
import useLogout from "../../hooks/useLogout";
import "./Header.css";

const Header: FC = () => {
  const path = useLocation().pathname;
  const [isHomePage, setIsHomePage] = useState(false);
  const [isUserTooltipOpen, setIsUserTooltipOpen] = useState(false);
  const { colorMode: storedColorMode, toggleColorMode } = useColorMode();
  const colorMode = localStorage.getItem("colorMode") || storedColorMode;
  const { data: user, isLoading: isUserLoading } = useMe();
  const { mutate: logout } = useLogout();
  const avatar = `${URL_API_IMG}${user?.photo}` || "";

  const handleLogout = () => {
    logout();
    setIsUserTooltipOpen(false);
  };

  useEffect(() => {
    setIsHomePage(path === "/");
  }, [path]);

  useEffect(() => {
    document.body.classList.toggle("dark", colorMode === "dark");
  }, [colorMode]);

  const handleColorMode = () => {
    document.body.classList.toggle("dark");
    localStorage.setItem("colorMode", colorMode === "dark" ? "light" : "dark");
    toggleColorMode();
  };

  return (
    <AnimatePresence>
      <motion.header
        layout
        className={`header ${isHomePage ? "header--home" : ""}`}
        initial={{
          opacity: 0,
          height: 204,
        }}
        animate={{
          opacity: 1,
          height: "auto",
        }}
        exit={{
          opacity: 0,
          height: 204,
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="header__bg">
          <RetinaImg
            src="src/assets/images/header-bg-img.png"
            alt="header-bg"
            width={1920}
            height={450}
            className="header__bg-image"
          />
        </div>
        <div className="container">
          <div className="header__content">
            <div className="header__inner">
              <Link to="/" className="header__logo">
                <LogoIcon className="header__logo-icon" />
              </Link>
              <div className="header__buttons">
                <button className="header__button" onClick={handleColorMode}>
                  Сменить тему
                </button>
                {user ? (
                  <>
                    <button
                      className="header__button"
                      onClick={() => {
                        setIsUserTooltipOpen(!isUserTooltipOpen);
                      }}
                    >
                      {user.full_name ? (
                        <div className="header__user-inner">
                          {user.photo ? (
                            <img
                              src={avatar as string}
                              alt="avatar"
                              className="header__user-avatar"
                              width={30}
                              height={30}
                            />
                          ) : null}
                          <span className="header__user-name">
                            {user.full_name}
                          </span>
                          <TriangleIcon
                            className={`header__user-arrow ${
                              isUserTooltipOpen
                                ? "header__user-arrow--open"
                                : ""
                            }`}
                          />
                        </div>
                      ) : (
                        "Пользователь"
                      )}
                    </button>

                    <motion.div
                      className="header__user-tooltip"
                      initial={{ opacity: 0, y: 10, pointerEvents: "none" }}
                      animate={{
                        opacity: isUserTooltipOpen ? 1 : 0,
                        y: 0,
                        pointerEvents: isUserTooltipOpen ? "auto" : "none",
                      }}
                      exit={{ opacity: 0, y: 10, pointerEvents: "none" }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      <Link
                        className="header__tooltip-button"
                        to="/account"
                        onClick={() => {
                          setIsUserTooltipOpen(false);
                        }}
                      >
                        Профиль
                      </Link>
                      <button
                        className="header__tooltip-button"
                        onClick={handleLogout}
                      >
                        Выйти
                      </button>
                    </motion.div>
                  </>
                ) : isUserLoading ? (
                  <span className="header__button header__button--loading">
                    Вход...
                  </span>
                ) : (
                  <Link to="/login" className="header__button">
                    Войти
                  </Link>
                )}
              </div>
            </div>
            <div className="header__title">
              <h1 className="header__title-text">
                {isHomePage
                  ? "Там, где мир начинается с путешествий"
                  : "Истории ваших путешествий"}
              </h1>
            </div>
          </div>
        </div>
      </motion.header>
    </AnimatePresence>
  );
};

export default Header;
