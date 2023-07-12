import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store";
import request from "@/libs/axios";
import { kakaoPostOnCompleteData } from "@/types/kakaoPostOnCompleteData";
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

const KakaoPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const detailAddressRef = useRef(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [info, setInfo] = useState<kakaoInfo>({
    name: "",
    email: "",
    gender: "",
    birth: "",
    phone: "",
    provider: "kakao",
    postcode: "",
    address: "",
    detailAddress: "",
    extraAddress: "",
  });

  useEffect(() => {
    const url = new URLSearchParams(location.search);
    console.log(url.get("code"));
    const getToken = async () => {
      try {
        const res = await request.post("/auth/kakao", {
          code: url.get("code"),
        });

        console.log(res);
        if (!res.data.registered) {
          setInfo((state) => ({
            ...state,
            name: res.data.name,
            email: res.data.email,
            gender: res.data.gender,
            birth: res.data.birth,
            phone: res.data.phone,
          }));
          setIsLoading(false);
        } else {
          login(res.data.name, res.data.access, res.data.refresh);
          navigate("/", { replace: true });
        }
      } catch {
        return;
      }
    };
    if (url.get("code")) getToken();
    else navigate("/");
  }, [location.search, navigate, login]);

  const addressHandler = useCallback(() => {
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

  const changeHandler = useCallback(
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

  const submitHandler = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
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
    },
    [
      info.name,
      info.email,
      info.gender,
      info.birth,
      info.phone,
      info.address,
      info.detailAddress,
      info.extraAddress,
      info.provider,
      login,
      navigate,
    ]
  );
  if (isLoading) return <></>;

  return (
    <form onSubmit={submitHandler}>
      <div>
        <input
          placeholder="우편변호"
          name="postcode"
          id="postcode"
          value={info.postcode}
          onChange={changeHandler}
        />
        <button type="button" onClick={addressHandler}>
          찾기
        </button>
      </div>
      <div>
        <input
          placeholder="도로명 주소"
          name="address"
          value={info.address}
          onChange={changeHandler}
        />
      </div>
      <div>
        <input
          placeholder="상세 주소"
          name="detailAddress"
          ref={detailAddressRef}
          onChange={changeHandler}
        />
      </div>
      <div>
        <input name="extraAddress" value={info.extraAddress} disabled />
      </div>
      <button>회원가입</button>
    </form>
  );
};

export default KakaoPage;
