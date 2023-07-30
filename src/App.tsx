import { Navigate, Route, Routes } from "react-router-dom";
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
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useAuthStore } from "./store";
import CounselorDetailPage from "./routes/CounselorDetailPage";
function App() {
  const user = useAuthStore((state) => state.user);
  return (
    <>
      <div id="backdrop"></div>
      <div id="modal"></div>
      <Routes>
        <Route path="" element={<RootPage />} />
        <Route
          path="kakao"
          element={user ? <Navigate to="" replace={true} /> : <KakaoPage />}
        />
        <Route path="signup">
          <Route
            path=""
            element={
              user ? <Navigate to="" replace={true} /> : <SignUpOptionsPage />
            }
          />
          <Route
            path="email"
            element={user ? <Navigate to="" replace={true} /> : <SignUpPage />}
          />
          <Route
            path="kakao"
            element={
              user ? <Navigate to="" replace={true} /> : <KakaoSignUpPage />
            }
          />
          <Route
            path="success"
            element={
              user ? <Navigate to="" replace={true} /> : <SignUpSuccessPage />
            }
          />
        </Route>
        <Route
          path="analyze"
          element={user ? <AnalyzePage /> : <Navigate to="/" replace={true} />}
        />
        <Route path="matching">
          <Route
            path=""
            element={
              user ? <MatchingPage /> : <Navigate to="/" replace={true} />
            }
          />
          <Route
            path=":id"
            element={
              user ? (
                <CounselorDetailPage />
              ) : (
                <Navigate to="/" replace={true} />
              )
            }
          />
        </Route>
        <Route
          path="mypage"
          element={user ? <MyPage /> : <Navigate to="/" replace={true} />}
        />
        <Route path="connect" element={<ConnectPage />} />
      </Routes>
      <ReactQueryDevtools initialIsOpen={true} />
    </>
  );
}

export default App;
