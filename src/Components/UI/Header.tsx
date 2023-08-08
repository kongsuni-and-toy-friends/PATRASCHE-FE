import { shallow } from "zustand/shallow";
import { useGlobalStore } from "../../store";
import { Link } from "react-router-dom";
import LoginForm from "../Login/LoginForm";

const Header: React.FC = () => {
  const [user, openLoginForm, isLoginFormOpened, logout] = useGlobalStore(
    (state) => [
      state.user,
      state.openLoginForm,
      state.isLoginFormOpened,
      state.logout,
    ],
    shallow
  );

  console.log(user);

  return (
    <div className="w-[100%] text-right px-[20px] py-[10px] border-b-[1px] border-b-black">
      {isLoginFormOpened && <LoginForm />}
      {user === null ? (
        <>
          <button onClick={() => openLoginForm()} className="mx-5">
            로그인
          </button>
          <Link to="/signup" className="mx-5">
            회원가입
          </Link>
        </>
      ) : (
        <>
          <span className="mx-5">{user}</span>
          <button className="mx-5" onClick={logout}>
            로그아웃
          </button>
        </>
      )}
    </div>
  );
};

export default Header;
