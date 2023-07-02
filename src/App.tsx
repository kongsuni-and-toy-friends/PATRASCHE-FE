import { Route, Routes } from "react-router-dom";
import RootPage from "./routes/RootPage";
import LoginPage from "./routes/LoginPage";
import SignUpPage from "./routes/SignUpPage";
import SignUpOptionsPage from "./routes/SignUpOptionPage";
import KakaoPage from "./routes/KakaoPage";
function App() {
  return (
    <>
      <Routes>
        <Route path="" element={<RootPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="kakao" element={<KakaoPage />} />
        <Route path="signup">
          <Route path="" element={<SignUpOptionsPage />} />
          <Route path="email" element={<SignUpPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
