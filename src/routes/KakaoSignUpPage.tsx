import useKakaoSignUpPage from "@/Logic/routes/useKakaoSignUpPage";
import { Navigate } from "react-router-dom";

const KakaoSignUpPage = () => {
  const {
    info,
    location,
    handleSubmit,
    handleInputChange,
    handleAddress,
    detailAddressRef,
  } = useKakaoSignUpPage();
  if (!location.state) return <Navigate to="/" replace={true} />;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          placeholder="우편변호"
          name="postcode"
          id="postcode"
          value={info.postcode}
          onChange={handleInputChange}
        />
        <button type="button" onClick={handleAddress}>
          찾기
        </button>
      </div>
      <div>
        <input
          placeholder="도로명 주소"
          name="address"
          value={info.address}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <input
          placeholder="상세 주소"
          name="detailAddress"
          ref={detailAddressRef}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <input name="extraAddress" value={info.extraAddress} disabled />
      </div>
      <button>회원가입</button>
    </form>
  );
};

export default KakaoSignUpPage;
