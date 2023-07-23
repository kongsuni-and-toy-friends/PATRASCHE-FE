import request from "@/libs/axios";
import { useAuthStore } from "@/store";
import { useEffect } from "react";

const MatchingPage = () => {
  const access = useAuthStore((state) => state.access);
  console.log(access);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await request.get("/counselor/3", {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        });
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return <h1>매칭 페이지</h1>;
};

export default MatchingPage;
