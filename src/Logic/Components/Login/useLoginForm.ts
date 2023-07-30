import useFetch from "@/hooks/useFetch";
import usePost from "@/hooks/usePost";
import { useAuthStore } from "@/store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { shallow } from "zustand/shallow";

interface infoObj {
  email: string;
  password: string;
}

const useLoginForm = () => {
  const [info, setInfo] = useState<infoObj>({ email: "", password: "" });
  const idInputRef = useRef(null);
  const login = useAuthStore((state) => state.login);
  const closeLoginForm = useAuthStore((state) => state.closeLoginForm);

  const { mutate: postLogin } = useMutation(usePost("/auth/login"), {
    onSuccess: (data) => {
      login(data.name, data.access, data.refresh);
      closeLoginForm();
      navigate("");
    },
  });

  const navigate = useNavigate();

  const loginUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    postLogin({ email: info.email, pw: info.password });
  };

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setInfo((state) => ({
        ...state,
        [event.target.name]: event.target.value,
      }));
    },
    []
  );

  useEffect(() => {
    if (idInputRef.current !== null)
      (idInputRef.current as HTMLInputElement).focus();
  }, []);

  return { info, closeLoginForm, loginUser, handleInputChange, idInputRef };
};

export default useLoginForm;
