import { createPortal } from "react-dom";
import Backdrop from "../UI/Backdrop";
import KakaoButton from "../Kakao/KakaoButton";
import useLoginForm from "@/Logic/Components/Login/useLoginForm";

const LoginForm: React.FC = () => {
  const backdropRoot = document.getElementById("backdrop") as HTMLElement;
  const modalRoot = document.getElementById("modal") as HTMLElement;

  const { info, closeLoginForm, submitHandler, inputHandler } = useLoginForm();

  return (
    <>
      {createPortal(<Backdrop onClick={closeLoginForm} />, backdropRoot)}
      {createPortal(
        <form
          onSubmit={submitHandler}
          className="z-20 fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] border-2 border-black w-[600px] h-[400px] bg-white p-[50px]"
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
              value={info.email}
              onChange={inputHandler}
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
              onChange={inputHandler}
            />
          </div>
          <button className="border-[1px] border-black w-3/4 h-12 mx-auto block mt-16 mb-4">
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
