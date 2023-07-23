import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store";
import request from "@/libs/axios";
import { createPortal } from "react-dom";
import Backdrop from "@/Components/UI/Backdrop";
import { FadeLoader } from "react-spinners";

const KakaoPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  console.log("카카오 로그인 중");
  useEffect(() => {
    const url = new URLSearchParams(location.search);
    console.log(url.get("code"));
    const getToken = async () => {
      try {
        const res = await request.post("/auth/kakao", {
          code: url.get("code"),
        });

        if (!res.data.registered)
          navigate("/signup/kakao", { state: res.data });
        else {
          login(res.data.name, res.data.access, res.data.refresh);
          navigate("/", { replace: true });
        }
      } catch (error) {
        console.log("[에러]", error);
      }
    };
    if (url.get("code")) getToken();
    else navigate("/");
  }, [location.search, navigate, login]);

  const backdropRoot = document.getElementById("backdrop") as HTMLElement;
  const modalRoot = document.getElementById("modal") as HTMLElement;
  return (
    <>
      {createPortal(<Backdrop />, backdropRoot)}
      {createPortal(
        <FadeLoader
          color="#ffffff"
          cssOverride={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: "20",
          }}
        />,
        modalRoot
      )}
    </>
  );
};

export default KakaoPage;
