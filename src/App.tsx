import { Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import HomePage from "./pages/HomePage/HomePage";
import PostPage from "./pages/PostPage/PostPage";
import AccountPage from "./pages/AccountPage/AccountPage";
import FormPage from "./pages/FormPage/FormPage";
import Header from "./components/Header/Header";
import "./styles/app.css";

function App() {
  return (
    <>
      <Header />
      <motion.main layout>
        {/* <div className="container"> */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:id" element={<PostPage />} />
          <Route path="/login" element={<FormPage page="login" />} />
          <Route path="/register" element={<FormPage page="register" />} />
          <Route
            path="/create-post"
            element={<FormPage page="create-post" />}
          />
          <Route path="/account" element={<AccountPage />} />
        </Routes>
        {/* </div> */}
      </motion.main>
    </>
  );
}

export default App;
