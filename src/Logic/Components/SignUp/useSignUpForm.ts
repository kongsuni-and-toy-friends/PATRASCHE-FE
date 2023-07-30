import usePost from "@/hooks/usePost";
import request from "@/libs/axios";
import parseAddress from "@/libs/parseAddress";
import { KakaoPostOnCompleteData } from "@/types/kakaoPostOnCompleteData";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

interface infoObj {
  email: string;
  password: string;
  passwordVerification: string;
  name: string;
  birthDate: Date;
  gender: string;
  phone1: string;
  phone2: string;
  phone3: string;
  address: string;
  postcode: string;
  detailAddress: string;
  extraAddress: string;
}

const { daum } = window;

const useSignUpForm = () => {
  const [info, setInfo] = useState<infoObj>({
    email: "",
    password: "",
    passwordVerification: "",
    name: "",
    birthDate: new Date(),
    gender: "",
    phone1: "",
    phone2: "",
    phone3: "",
    address: "",
    postcode: "",
    detailAddress: "",
    extraAddress: "",
  });

  const detailAddressRef = useRef(null);
  const navigate = useNavigate();
  const [checkButtonClicked, setCheckButtonClicked] = useState<boolean>(false);
  const [isDuplicated, setIsDuplicated] = useState<boolean>(false);

  const { mutate: postSignUp } = useMutation(usePost("/auth/register"), {
    onSuccess: () => {
      navigate("/signup/success");
    },
    onError: () => console.log("[에러]"),
  });

  const signUpUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // submit default event 방지

    postSignUp({
      name: info.name,
      email: info.email,
      gender: info.gender,
      birth: info.birthDate,
      phone: `${info.phone1}-${info.phone2}-${info.phone3}`,
      address: `${info.address} ${info.detailAddress} ${info.extraAddress}`,
      pw: info.password,
    });
  };

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setInfo((state) => {
        return {
          ...state,
          [event.target.name]: event.target.value,
        };
      });
    },
    []
  );

  const handleAddress = useCallback(() => {
    new daum.Postcode({
      oncomplete: function (data: KakaoPostOnCompleteData) {
        const { postcode, address, extraAddress } = parseAddress(data);

        setInfo((state) => ({
          ...state,
          postcode,
          address,
          extraAddress,
        }));

        if (detailAddressRef.current !== null) {
          (detailAddressRef.current as HTMLInputElement).focus();
        }
      },
    }).open();
  }, []);

  const checkEmailDuplication = useCallback(async () => {
    try {
      setCheckButtonClicked(true);
      const res = await request.get(`/auth/dupcheck?email=${info.email}`);
      if (res.data.result) {
        setIsDuplicated(false);
      } else {
        setIsDuplicated(true);
      }
    } catch (error) {
      console.log("[에러]", error);
    }
  }, [info.email]);

  return {
    info,
    signUpUser,
    handleInputChange,
    checkEmailDuplication,
    handleAddress,
    checkButtonClicked,
    isDuplicated,
    detailAddressRef,
  };
};

export default useSignUpForm;
