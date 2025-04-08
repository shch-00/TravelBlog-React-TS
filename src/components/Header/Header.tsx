import { motion, AnimatePresence } from "framer-motion";
import { FC, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useColorMode } from "../../contexts/ColorModeContext";
import { useMe } from "../../hooks";
import RetinaImg from "../RetinaImg/RetinaImg";
import LogoIcon from "../../assets/logo.svg?react";
import "./Header.css";

const Header: FC = () => {
  const path = useLocation().pathname;
  const [isHomePage, setIsHomePage] = useState(false);
  const { colorMode: storedColorMode, toggleColorMode } = useColorMode();
  const colorMode = localStorage.getItem("colorMode") || storedColorMode;
  const { data: user, isLoading: isUserLoading } = useMe();

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
                  <button
                    className="header__button"
                    onClick={() => console.log(user)}
                  >
                    {user.full_name}
                  </button>
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
