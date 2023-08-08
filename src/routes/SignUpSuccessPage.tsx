import { useCallback } from "react";
import { useGlobalStore } from "../store";
import { useNavigate } from "react-router-dom";

const SignUpSuccessPage = () => {
  const openLoginForm = useGlobalStore((state) => state.openLoginForm);
  const navigate = useNavigate();

  const buttonClickHandler = useCallback(() => {
    openLoginForm();
  }, [navigate, openLoginForm]);

  return (
    <div>
      <h1>회원가입에 성공했습니다.</h1>
      <div>
        <button onClick={buttonClickHandler}>로그인하러 가기</button>
      </div>
    </div>
  );
};

export default SignUpSuccessPage;
