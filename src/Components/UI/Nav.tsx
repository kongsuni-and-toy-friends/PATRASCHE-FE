import { useAuthStore } from "@/store";
import { Link, NavLink } from "react-router-dom";

const Nav: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  return (
    <div className="h-[90px] flex justify-around items-center border-b-[1px] border-black">
      <Link to="/" className="font-semibold text-4xl">
        파트라슈
      </Link>
      {user !== null && (
        <div className="[&>a]:mx-[100px]">
          <NavLink
            to="/analyze"
            className={({ isActive }) => {
              if (isActive) return "font-bold";
            }}
          >
            대화 분석
          </NavLink>
          <NavLink
            to="/mathcing"
            className={({ isActive }) => {
              if (isActive) return "font-bold";
            }}
          >
            상담사 매칭
          </NavLink>
          <NavLink
            to="/mypage"
            className={({ isActive }) => {
              if (isActive) return "font-bold";
            }}
          >
            마이 페이지
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Nav;
