import { Link, Route, Routes } from "react-router-dom";
import RootPage from "./routes/RootPage";
import LoginPage from "./routes/LoginPage";
import SignUpPage from "./routes/SignUpPage";
import { useAuthStore } from "./store";
import LoginForm from "./Components/Login/LoginForm";

function App() {
  const isLoginFormOpened = useAuthStore((state) => state.isLoginFormOpened);

  return (
    <>
      {isLoginFormOpened && <LoginForm />}
      <Routes>
        <Route path="/" element={<RootPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </>
  );
}

export default App;
