import isNavActive from "@/libs/isNavActive";
import { useGlobalStore } from "@/store";
import { Link, NavLink } from "react-router-dom";

const Nav: React.FC = () => {
  const user = useGlobalStore((state) => state.user);
  return (
    <div className="h-[90px] flex justify-around items-center border-b-[1px] border-black">
      <Link to="/" className="font-semibold text-4xl">
        파트라슈
      </Link>
      {user && (
        <div className="[&>a]:mx-[40px]">
          <NavLink to="/analyze" className={isNavActive}>
            대화 분석
          </NavLink>
          <NavLink to="/matching" className={isNavActive}>
            상담사 매칭
          </NavLink>
          <NavLink to="/mypage" className={isNavActive}>
            마이 페이지
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Nav;
