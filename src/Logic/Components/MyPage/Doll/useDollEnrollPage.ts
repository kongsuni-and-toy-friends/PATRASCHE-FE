import useFetch from "@/hooks/useFetch";
import usePost from "@/hooks/usePost";
import request from "@/libs/axios";
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
  pinIsDuplicated: boolean;
}

const useDollEnrollPage = () => {
  const [info, setInfo] = useState<DollEnrollProps>({
    pin: "",
    name: "",
    gender: "",
    doll: "",
    birth: "",
    pinIsChecked: false,
    pinIsDuplicated: false,
  });

  const [
    isConnectionFormOpened,
    openConnectionForm,
    closeConnectionForm,
    access,
  ] = useGlobalStore(
    (state) => [
      state.isConnectionFormOpened,
      state.openConnectionForm,
      state.closeConnectionForm,
      state.access,
    ],
    shallow
  );

  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInfo((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(usePost("/mypage/enroll"), {
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

  const checkPin = async () => {
    const res = await request.get("/mypage/doll_check", {
      headers: { Authorization: `Bearer ${access}` },
      params: { pin: info.pin },
    });
    console.log(res);
    setInfo((prev) => ({
      ...prev,
      pinIsChecked: true,
      pinIsDuplicated: !res.data.response,
    }));
  };

  return {
    info,
    handleInputChange,
    enrollDoll,
    isConnectionFormOpened,
    openConnectionForm,
    closeConnectionForm,
    checkPin,
    isLoading,
  };
};

export default useDollEnrollPage;
