import useFetch from "@/hooks/useFetch";
import usePost from "@/hooks/usePost";
import request from "@/libs/axios";
import { useGlobalStore } from "@/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router";

interface DollEnrollProps {
  pin: string;
  name: string;
  gender: string;
  doll: string;
  birth: string;
}

const useDollEnrollPage = () => {
  const [info, setInfo] = useState<DollEnrollProps>({
    pin: "",
    name: "",
    gender: "",
    doll: "",
    birth: "",
  });

  const isConnectionFormOpened = useGlobalStore(
    (state) => state.isConnectionFormOpened
  );
  const openConnectionForm = useGlobalStore(
    (state) => state.openConnectionForm
  );
  const closeConnectionForm = useGlobalStore(
    (state) => state.closeConnectionForm
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

  // const checkPin = async () => {
  //   const res = await request.get("/mypage/doll_check", {
  //     headers: { Authorization: `Bearer ${access}` },
  //     params: { pin: info.pin },
  //   });
  //   setInfo((prev) => ({
  //     ...prev,
  //     pinIsChecked: true,
  //     pinIsDuplicated: !res.data.response,
  //   }));
  // };

  const { data: pinIsAvailable, refetch } = useFetch<boolean>(
    "/mypage/doll_check",
    {
      queryKey: ["dollCheck"],
      select: (data: { response: boolean }) => data.response,
      enabled: false,
      cacheTime: 0,
    },
    {
      params: { pin: info.pin },
    }
  );

  return {
    info,
    handleInputChange,
    enrollDoll,
    isConnectionFormOpened,
    openConnectionForm,
    closeConnectionForm,
    isLoading,
    pinIsAvailable,
    refetch,
  };
};

export default useDollEnrollPage;
