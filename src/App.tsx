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
import { useGlobalStore } from "./store";
import CounselorDetailPage from "./routes/CounselorDetailPage";
import MyPageEntry from "./Components/MyPage/MyPageEntry";
import DollListPage from "./Components/MyPage/Doll/DollListPage";
import DollEnrollPage from "./Components/MyPage/Doll/DollEnrollPage";
function App() {
  const user = useGlobalStore((state) => state.user);
  return (
    <>
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
        >
          <Route path="" element={<MyPageEntry />} />
          <Route path="list">
            <Route path="" element={<DollListPage />} />
            <Route path="enroll" element={<DollEnrollPage />} />
          </Route>
          <Route path="record" element={<h1>내역 조회</h1>} />
          <Route path="info" element={<h1>내 정보 수정</h1>} />
          <Route path="faq" element={<h1>FAQ</h1>} />
        </Route>
        <Route path="connect" element={<ConnectPage />} />
      </Routes>
      <ReactQueryDevtools initialIsOpen={true} />
    </>
  );
}

export default App;
