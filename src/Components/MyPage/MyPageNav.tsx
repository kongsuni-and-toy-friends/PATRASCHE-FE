import isNavActive from "@/libs/isNavActive";
import { NavLink } from "react-router-dom";

const MyPageNav = () => {
  return (
    <div className="[&_a]:mx-3 my-1">
      <NavLink to="list" className={isNavActive}>
        인형 / 아이 조회
      </NavLink>
      <NavLink to="record" className={isNavActive}>
        상담 내역 조회
      </NavLink>
      <NavLink to="info" className={isNavActive}>
        개인 정보 수정
      </NavLink>
      <NavLink to="faq" className={isNavActive}>
        FAQ
      </NavLink>
    </div>
  );
};

export default MyPageNav;
