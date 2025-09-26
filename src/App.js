import {
  jsx as _jsx,
  jsxs as _jsxs,
  Fragment as _Fragment,
} from "react/jsx-runtime";
import { Routes, Route, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import HomePage from "./pages/HomePage/HomePage";
import PostPage from "./pages/PostPage/PostPage";
import AccountPage from "./pages/AccountPage/AccountPage";
import FormPage from "./pages/FormPage/FormPage";
import Header from "./components/Header";
import "./styles/app.css";
function App() {
  const isUserLogged = Boolean(localStorage.getItem("token"));
  return _jsxs(_Fragment, {
    children: [
      _jsx(Header, {}),
      _jsx(motion.main, {
        layout: true,
        children: _jsxs(Routes, {
          children: [
            _jsx(Route, { path: "/", element: _jsx(HomePage, {}) }),
            _jsx(Route, { path: "/:id", element: _jsx(PostPage, {}) }),
            _jsx(Route, {
              path: "/login",
              element: isUserLogged
                ? _jsx(Navigate, { to: "/account", replace: true })
                : _jsx(FormPage, { page: "login" }),
            }),
            _jsx(Route, {
              path: "/register",
              element: isUserLogged
                ? _jsx(Navigate, { to: "/account", replace: true })
                : _jsx(FormPage, { page: "register" }),
            }),
            _jsx(Route, {
              path: "/add-comment/:id",
              element: isUserLogged
                ? _jsx(FormPage, { page: "add-comment" })
                : _jsx(Navigate, { to: "/", replace: true }),
            }),
            _jsx(Route, {
              path: "/create-post",
              element: isUserLogged
                ? _jsx(FormPage, { page: "create-post" })
                : _jsx(Navigate, { to: "/", replace: true }),
            }),
            _jsx(Route, {
              path: "/account",
              element: isUserLogged
                ? _jsx(AccountPage, { path: "account" })
                : _jsx(Navigate, { to: "/", replace: true }),
            }),
            _jsx(Route, {
              path: "/account-edit",
              element: isUserLogged
                ? _jsx(AccountPage, { path: "account-edit" })
                : _jsx(Navigate, { to: "/", replace: true }),
            }),
          ],
        }),
      }),
    ],
  });
}
export default App;
