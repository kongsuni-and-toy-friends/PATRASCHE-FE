import { useCallback } from "react";
import { useNavigate } from "react-router";

const useDollListPage = () => {
  const navigate = useNavigate();

  const enrollDoll = useCallback(() => {
    navigate("enroll");
  }, []);

  return { enrollDoll };
};

export default useDollListPage;
