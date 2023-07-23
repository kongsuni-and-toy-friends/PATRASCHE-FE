import request from "@/libs/axios";
import { useAuthStore } from "@/store";
import { FormEvent, useCallback, useState } from "react";
import shallow from "zustand/shallow";

interface infoObj {
  email: string;
  password: string;
}

const useLoginForm = () => {
  const [info, setInfo] = useState<infoObj>({ email: "", password: "" });

  const [closeLoginForm, login] = useAuthStore(
    (state) => [state.closeLoginForm, state.login, state.isLoginFormOpened],
    shallow
  );
  const submitHandler = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      try {
        const res = await request.post("/auth/login", {
          email: info.email,
          pw: info.password,
        });
        console.log(res);
        login("테스트", res.data.access, res.data.refresh);
        closeLoginForm();
      } catch (error) {
        console.log("[에러]", error);
      }
    },
    [info.email, login, closeLoginForm, info.password]
  );

  const inputHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setInfo((state) => ({
        ...state,
        [event.target.name]: event.target.value,
      }));
    },
    []
  );

  return { info, closeLoginForm, submitHandler, inputHandler };
};

export default useLoginForm;
