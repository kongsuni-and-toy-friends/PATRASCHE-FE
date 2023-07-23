import { Route, Routes } from "react-router-dom";
import RootPage from "./routes/RootPage";
import SignUpPage from "./routes/SignUpPage";
import SignUpOptionsPage from "./routes/SignUpOptionPage";
import KakaoPage from "./routes/KakaoPage";
import SignUpSuccessPage from "./routes/SignUpSuccessPage";
import AnalyzePage from "./routes/AnalyzePage";
import MatchingPage from "./routes/MatchingPage";
import MyPage from "./routes/MyPage";
import KakaoSignUpPage from "./routes/KakaoSignUpPage";
import ConnectPage from "./routes/ConnectPage";
function App() {
  return (
    <>
      <Routes>
        <Route path="" element={<RootPage />} />
        <Route path="kakao" element={<KakaoPage />} />
        <Route path="signup">
          <Route path="" element={<SignUpOptionsPage />} />
          <Route path="email" element={<SignUpPage />} />
          <Route path="kakao" element={<KakaoSignUpPage />} />
          <Route path="success" element={<SignUpSuccessPage />} />
        </Route>
        <Route path="analyze" element={<AnalyzePage />} />
        <Route path="matching" element={<MatchingPage />} />
        <Route path="mypage" element={<MyPage />} />
        <Route path="connect" element={<ConnectPage />} />
      </Routes>
    </>
  );
}

export default App;
