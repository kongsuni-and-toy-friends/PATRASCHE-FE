import request from "@/libs/axios";
import parseAddress from "@/libs/parseAddress";
import { useAuthStore } from "@/store";
import { KakaoPostOnCompleteData } from "@/types/kakaoPostOnCompleteData";
import { useCallback, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface kakaoInfo {
  name: string;
  email: string;
  gender: string;
  birth: string;
  phone: string;
  provider: "kakao";
  postcode: string;
  address: string;
  detailAddress: string;
  extraAddress: string;
}

const { daum } = window;
const useKakaoSignUpPage = () => {
  const detailAddressRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const [info, setInfo] = useState<kakaoInfo>({
    name: location.state.name,
    email: location.state.email,
    gender: location.state.gender,
    birth: location.state.birth,
    phone: location.state.phone,
    provider: "kakao",
    postcode: "",
    address: "",
    detailAddress: "",
    extraAddress: "",
  });
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const res = await request.post("/auth/register", {
        name: info.name,
        email: info.email,
        gender: info.gender,
        birth: info.birth,
        phone: info.phone,
        address: `${info.address} ${info.detailAddress} ${info.extraAddress}`,
        provider: info.provider,
      });
      login(info.name, res.data.access, res.data.refresh);
      navigate("/", { replace: true });
    } catch (error) {
      console.log("[에러]", error);
    }
  };

  return {
    info,
    location,
    handleSubmit,
    handleInputChange,
    handleAddress,
    detailAddressRef,
  };
};

export default useKakaoSignUpPage;
