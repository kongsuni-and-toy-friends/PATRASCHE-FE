import { useCallback } from "react";

const { Kakao } = window;

const useKakaoButton = () => {
  const kakaoLogin = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault();
      Kakao.Auth.authorize({ redirectUri: "http://localhost:5173/kakao" });
    },
    []
  );

  return { kakaoLogin };
};

export default useKakaoButton;
