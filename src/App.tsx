// import { Routes, Route } from "react-router-dom";
// import { motion } from "framer-motion";
// import CreatePostPage from "./pages/CreatePostPage";
import "./App.css";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
{
  /* <Routes>
      <motion.main>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/create-post" element={<CreatePostPage />} />
        <Route path="/:id" element={<PostPage />} />
        <Route path="/:id/edit" element={<EditPostPage />} />
        <Route path="/:id/review" element={<ReviewPage />} />
      </motion.main>
    </Routes> */
}

interface User {
  email: string;
  password: string;
}

async function fetchMe() {
  const response = await fetch("https://travelblog.skillbox.cc/api/user", {
    credentials: "include",
    method: "GET",
  });
  const data = await response.json();
  return data;
}

async function register(user: User) {
  const response = await fetch("https://travelblog.skillbox.cc/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error("Failed to register");
  }

  const data = await response.json();
  console.log(data);
  return data;
}

async function login(user: User) {
  const response = await fetch("https://travelblog.skillbox.cc/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error("Failed to login");
  }

  const data = await response.json();
  localStorage.setItem("token", data.token);
  return data;
}

const useMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: fetchMe,
  });
};

const useLogin = () => {
  return useMutation({
    mutationFn: (user: User) => login(user),
  });
};

const useRegister = () => {
  return useMutation({
    mutationFn: (user: User) => register(user),
  });
};

function App() {
  const { data: me, status } = useMe();
  const { mutate: login, isError: loginError } = useLogin();
  const { mutate: register, isError: registerError } = useRegister();
  const [isAuth, setIsAuth] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  useEffect(() => {
    if (status === "success") {
      setIsAuth(true);
      console.log(me);
    }
  }, [status, me]);

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };
    register(data);
    if (!registerError) {
      setIsRegister(true);
    }
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };
    login(data);
    if (!loginError) {
      setIsAuth(true);
      setIsRegister(false);
    }
  };

  if (isRegister) {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <input type="text" placeholder="Email" name="email" />
          <input type="password" placeholder="Password" name="password" />
          <button
            type="submit"
            onClick={(e) => {
              return e;
            }}
          >
            Login
          </button>
        </form>
        <button onClick={() => setIsRegister(false)}>Register</button>
      </div>
    );
  }

  if (!isAuth) {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={handleRegister}>
          <input type="text" placeholder="Email" name="email" />
          <input type="password" placeholder="Password" name="password" />
          <button
            type="submit"
            onClick={(e) => {
              return e;
            }}
          >
            Register
          </button>
        </form>
        <button onClick={() => setIsRegister(true)}>Login</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Welcome</h1>
    </div>
  );
}

export default App;
