import usePost from "@/hooks/usePost";
import { useGlobalStore } from "@/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router";
import { shallow } from "zustand/shallow";

interface DollEnrollProps {
  pin: string;
  name: string;
  gender: string;
  doll: string;
  birth: string;
  pinIsChecked: boolean;
  isUserFeedBackNeeded: boolean;
}

const useDollEnrollPage = () => {
  const [info, setInfo] = useState<DollEnrollProps>({
    pin: "",
    name: "",
    gender: "",
    doll: "",
    birth: "",
    pinIsChecked: false,
    isUserFeedBackNeeded: false,
  });

  const [isConnectionFormOpened, openConnectionForm, closeConnectionForm] =
    useGlobalStore(
      (state) => [
        state.isConnectionFormOpened,
        state.openConnectionForm,
        state.closeConnectionForm,
      ],
      shallow
    );

  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInfo((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const queryClient = useQueryClient();

  const { mutate } = useMutation(usePost("/mypage/enroll"), {
    onSuccess: () => {
      queryClient.invalidateQueries();
      navigate(-1);
    },
    onError: () => console.log("[에러]"),
  });

  const enrollDoll = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(info);
    mutate(info);
  };

  const checkPin = useCallback(() => {
    setInfo((prev) => ({ ...prev, pinIsChecked: true }));
  }, []);

  return {
    info,
    handleInputChange,
    enrollDoll,
    isConnectionFormOpened,
    openConnectionForm,
    closeConnectionForm,
    checkPin,
  };
};

export default useDollEnrollPage;
