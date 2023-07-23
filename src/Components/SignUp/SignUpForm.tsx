import useSignUpForm from "@/Logic/Components/SignUp/useSignUpForm";

const SignUpForm = () => {
  const {
    info,
    signUpUser,
    handleInputChange,
    checkEmailDuplication,
    handleAddress,
    checkButtonClicked,
    isDuplicated,
    detailAddressRef,
  } = useSignUpForm();

  return (
    <form
      className="[&_input]:border-b-[1px] [&_input]:border-black [&_input]:outline-none"
      onSubmit={signUpUser}
    >
      <div>
        <label htmlFor="email">이메일</label>
        <input
          type="text"
          id="email"
          name="email"
          value={info.email}
          onChange={handleInputChange}
        />
        <button type="button" onClick={checkEmailDuplication}>
          중복 확인
        </button>
      </div>
      {checkButtonClicked && isDuplicated ? (
        <div>이미 사용중인 이메일입니다.</div>
      ) : (
        <div>사용 가능합니다.</div>
      )}
      <div>
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="passwordVerification">비밀번호 확인</label>
        <input
          type="password"
          id="passwordVerification"
          name="passwordVerification"
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="name">이름</label>
        <input type="text" name="name" id="name" onChange={handleInputChange} />
      </div>
      <div>
        <label htmlFor="name">생년월일</label>
        <input type="date" name="birthDate" onChange={handleInputChange} />
      </div>
      <div>
        <div>성별</div>
        <input
          type="radio"
          id="male"
          name="gender"
          value="male"
          required
          onChange={handleInputChange}
        />
        <label htmlFor="male">남자</label>
        <input
          type="radio"
          id="female"
          name="gender"
          value="female"
          onChange={handleInputChange}
        />
        <label htmlFor="female">여자</label>
      </div>
      <div>
        <label htmlFor="phone">전화번호</label>
        <input
          type="number"
          id="phone1"
          name="phone1"
          onChange={handleInputChange}
          required
        />
        <span>-</span>
        <input
          type="number"
          id="phone2"
          name="phone2"
          value={info.phone2}
          onChange={handleInputChange}
          required
        />
        <span>-</span>
        <input
          type="number"
          id="phone3"
          name="phone3"
          value={info.phone3}
          onChange={handleInputChange}
          required
        />
      </div>
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
      <div>
        <input type="checkbox" id="required" />
        <label htmlFor="required">
          (필수) 개인정보 제공 약관에 동의합니다.
        </label>
      </div>
      <div>
        <input type="checkbox" id="select" />
        <label htmlFor="select">
          (선택) SMS, 이메일을 통한 마케팅 정보 수신에 동의합니다.
        </label>
      </div>
      <button>회원가입</button>
    </form>
  );
};

export default SignUpForm;
