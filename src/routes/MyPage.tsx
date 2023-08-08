import MyPageNav from "@/Components/MyPage/MyPageNav";
import { Outlet } from "react-router-dom";

const MyPage = () => {
  return (
    <>
      <MyPageNav />
      <Outlet />
    </>
  );
};

export default MyPage;
