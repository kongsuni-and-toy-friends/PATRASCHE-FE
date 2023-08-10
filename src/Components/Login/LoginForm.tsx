import { createPortal } from "react-dom";
import Backdrop from "../UI/Backdrop";
import KakaoButton from "../Kakao/KakaoButton";
import useLoginForm from "@/Logic/Components/Login/useLoginForm";

const LoginForm: React.FC = () => {
  const backdropRoot = document.getElementById("backdrop") as HTMLElement;
  const modalRoot = document.getElementById("modal") as HTMLElement;

  const {
    info,
    closeLoginForm,
    loginUser,
    handleInputChange,
    idInputRef,
    hasError,
  } = useLoginForm();

  return (
    <>
      {createPortal(<Backdrop onClick={closeLoginForm} />, backdropRoot)}
      {createPortal(
        <form
          onSubmit={loginUser}
          className="z-20 fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] border-2 border-black w-[600px] min-h-[400px] bg-white p-[50px]"
        >
          <div className="my-8">
            <label htmlFor="email" className="block">
              이메일
            </label>
            <input
              type="text"
              name="email"
              id="email"
              className="border-b-[1px] border-black w-full focus:outline-none"
              ref={idInputRef}
              value={info.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="my-8">
            <label htmlFor="password" className="block">
              비밀번호
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="border-b-[1px] border-black w-full focus:outline-none"
              value={info.password}
              onChange={handleInputChange}
            />
          </div>
          {hasError && (
            <div className="absolute left-1/2 top-56 translate-x-[-50%]">
              이메일, 비밀번호가 잘못 입력되었습니다.
            </div>
          )}
          <button className="border-[1px] border-black w-3/4 h-12 mx-auto block mt-12 mb-4">
            로그인
          </button>
          <KakaoButton />
        </form>,
        modalRoot
      )}
    </>
  );
};

export default LoginForm;
