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
  return (
    <>
      <Header />
      <motion.main layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:id" element={<PostPage />} />
          <Route
            path="/login"
            element={
              isUserLogged ? (
                <Navigate to="/account" replace />
              ) : (
                <FormPage page="login" />
              )
            }
          />
          <Route
            path="/register"
            element={
              isUserLogged ? (
                <Navigate to="/account" replace />
              ) : (
                <FormPage page="register" />
              )
            }
          />
          <Route
            path="/add-comment/:id"
            element={
              isUserLogged ? (
                <FormPage page="add-comment" />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/create-post"
            element={
              isUserLogged ? (
                <FormPage page="create-post" />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/account"
            element={
              isUserLogged ? (
                <AccountPage path="account" />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/account-edit"
            element={
              isUserLogged ? (
                <AccountPage path="account-edit" />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Routes>
      </motion.main>
    </>
  );
}

export default App;
