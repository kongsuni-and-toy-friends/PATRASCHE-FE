import axios from "axios";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const RootPage: React.FC = () => {
  const location = useLocation();
  useEffect(() => {
    const url = new URLSearchParams(location.search);
    console.log(url.get("code"));

    console.log(import.meta.env.VITE_KAKAO_RESTAPI_KEY);
    const getToken = async () => {
      try {
        const res = await axios.post(
          "https://kauth.kakao.com/oauth/token",
          {
            grant_type: "authorization_code",
            client_id: import.meta.env.VITE_KAKAO_RESTAPI_KEY,
            redirect_uri: "http://localhost:5173",
            code: url.get("code"),
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
            },
          }
        );

        console.log(res.data);
      } catch {
        return;
      }
    };
    if (url.get("code")) getToken();
  }, [location.search]);
  return (
    <>
      <h1 className="text-3xl font-bold underline">파트라슈</h1>
    </>
  );
};

export default RootPage;
