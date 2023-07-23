import request from "@/libs/axios";
import { useAuthStore } from "@/store";
import { kakaoPostOnCompleteData } from "@/types/kakaoPostOnCompleteData";
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
      oncomplete: function (data: kakaoPostOnCompleteData) {
        // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

        // 각 주소의 노출 규칙에 따라 주소를 조합한다.
        // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
        let addr = ""; // 주소 변수
        let extraAddr = ""; // 참고항목 변수

        //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
        if (data.userSelectedType === "R") {
          // 사용자가 도로명 주소를 선택했을 경우
          addr = data.roadAddress;
        } else {
          // 사용자가 지번 주소를 선택했을 경우(J)
          addr = data.jibunAddress;
        }

        // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
        if (data.userSelectedType === "R") {
          // 법정동명이 있을 경우 추가한다. (법정리는 제외)
          // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
          if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
            extraAddr += data.bname;
          }
          // 건물명이 있고, 공동주택일 경우 추가한다.
          if (data.buildingName !== "" && data.apartment === "Y") {
            extraAddr +=
              extraAddr !== "" ? ", " + data.buildingName : data.buildingName;
          }
          // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
          if (extraAddr !== "") {
            extraAddr = " (" + extraAddr + ")";
          }
          // 조합된 참고항목을 해당 필드에 넣는다.
        }

        setInfo((state) => ({
          ...state,
          postcode: data.zonecode,
          address: addr,
          extraAddress: extraAddr,
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

      console.log(res);

      login(info.name, res.data.access, res.data.refresh);
      navigate("/", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    info, location, handleSubmit, handleInputChange, handleAddress, detailAddressRef
    
  }
};

export default useKakaoSignUpPage;
