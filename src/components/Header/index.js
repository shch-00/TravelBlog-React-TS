import {
  jsx as _jsx,
  jsxs as _jsxs,
  Fragment as _Fragment,
} from "react/jsx-runtime";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useColorMode } from "../../contexts/ColorModeContext";
import { useMe } from "../../hooks";
import { URL_API_IMG } from "../../api/URL_API";
import TriangleIcon from "../../assets/icons/triangle.svg?react";
import RetinaImg from "../RetinaImg/RetinaImg";
import LogoIcon from "../../assets/logo.svg?react";
import useLogout from "../../hooks/useLogout";
import "./Header.css";
const Header = () => {
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
  return _jsx(AnimatePresence, {
    children: _jsxs(motion.header, {
      layout: true,
      className: `header ${isHomePage ? "header--home" : ""}`,
      initial: {
        opacity: 0,
        height: 204,
      },
      animate: {
        opacity: 1,
        height: "auto",
      },
      exit: {
        opacity: 0,
        height: 204,
      },
      transition: { duration: 0.4, ease: "easeOut" },
      children: [
        _jsx("div", {
          className: "header__bg",
          children: _jsx(RetinaImg, {
            src: "src/assets/images/header-bg-img.png",
            alt: "header-bg",
            width: 1920,
            height: 450,
            className: "header__bg-image",
          }),
        }),
        _jsx("div", {
          className: "container",
          children: _jsxs("div", {
            className: "header__content",
            children: [
              _jsxs("div", {
                className: "header__inner",
                children: [
                  _jsx(Link, {
                    to: "/",
                    className: "header__logo",
                    children: _jsx(LogoIcon, {
                      className: "header__logo-icon",
                    }),
                  }),
                  _jsxs("div", {
                    className: "header__buttons",
                    children: [
                      _jsx("button", {
                        className: "header__button",
                        onClick: handleColorMode,
                        children:
                          "\u0421\u043C\u0435\u043D\u0438\u0442\u044C \u0442\u0435\u043C\u0443",
                      }),
                      user
                        ? _jsxs(_Fragment, {
                            children: [
                              _jsx("button", {
                                className: "header__button",
                                onClick: () => {
                                  setIsUserTooltipOpen(!isUserTooltipOpen);
                                },
                                children: user.full_name
                                  ? _jsxs("div", {
                                      className: "header__user-inner",
                                      children: [
                                        user.photo
                                          ? _jsx("img", {
                                              src: avatar,
                                              alt: "avatar",
                                              className: "header__user-avatar",
                                              width: 30,
                                              height: 30,
                                            })
                                          : null,
                                        _jsx("span", {
                                          className: "header__user-name",
                                          children: user.full_name,
                                        }),
                                        _jsx(TriangleIcon, {
                                          className: `header__user-arrow ${
                                            isUserTooltipOpen
                                              ? "header__user-arrow--open"
                                              : ""
                                          }`,
                                        }),
                                      ],
                                    })
                                  : "Пользователь",
                              }),
                              _jsxs(motion.div, {
                                className: "header__user-tooltip",
                                initial: {
                                  opacity: 0,
                                  y: 10,
                                  pointerEvents: "none",
                                },
                                animate: {
                                  opacity: isUserTooltipOpen ? 1 : 0,
                                  y: 0,
                                  pointerEvents: isUserTooltipOpen
                                    ? "auto"
                                    : "none",
                                },
                                exit: {
                                  opacity: 0,
                                  y: 10,
                                  pointerEvents: "none",
                                },
                                transition: { duration: 0.3, ease: "easeOut" },
                                children: [
                                  _jsx(Link, {
                                    className: "header__tooltip-button",
                                    to: "/account",
                                    onClick: () => {
                                      setIsUserTooltipOpen(false);
                                    },
                                    children:
                                      "\u041F\u0440\u043E\u0444\u0438\u043B\u044C",
                                  }),
                                  _jsx("button", {
                                    className: "header__tooltip-button",
                                    onClick: handleLogout,
                                    children: "\u0412\u044B\u0439\u0442\u0438",
                                  }),
                                ],
                              }),
                            ],
                          })
                        : isUserLoading
                          ? _jsx("span", {
                              className:
                                "header__button header__button--loading",
                              children: "\u0412\u0445\u043E\u0434...",
                            })
                          : _jsx(Link, {
                              to: "/login",
                              className: "header__button",
                              children: "\u0412\u043E\u0439\u0442\u0438",
                            }),
                    ],
                  }),
                ],
              }),
              _jsx("div", {
                className: "header__title",
                children: _jsx("h1", {
                  className: "header__title-text",
                  children: isHomePage
                    ? "Там, где мир начинается с путешествий"
                    : "Истории ваших путешествий",
                }),
              }),
            ],
          }),
        }),
      ],
    }),
  });
};
export default Header;
