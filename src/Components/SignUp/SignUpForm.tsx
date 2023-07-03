import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const SignUpForm: React.FC = () => {
  const navigate = useNavigate();
  const signUpHandler = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      navigate("/signup/success");
    },
    [navigate]
  );
  return (
    <form
      className="[&_input]:border-b-[1px] [&_input]:border-black [&_input]:outline-none"
      onSubmit={signUpHandler}
    >
      <div>
        <label>이메일</label>
        <input type="text" id="email" name="email" />
        <button type="button">중복 확인</button>
      </div>
      <div>
        <label>비밀번호</label>
        <input type="password" />
      </div>
      <div>
        <label>비밀번호 확인</label>
        <input type="password" />
      </div>
      <div>
        <label htmlFor="name">이름</label>
        <input type="text" />
      </div>
      <div>
        <label htmlFor="name">생년월일</label>
        <input type="date" />
      </div>
      <div>
        <div>성별</div>
        <input type="radio" id="male" name="gender" required />
        <label htmlFor="male">남자</label>
        <input type="radio" id="female" name="gender" />
        <label htmlFor="female">여자</label>
      </div>
      <div>
        <label htmlFor="phone">전화번호</label>
        <input
          type="tel"
          id="phone"
          pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
          required
        />
      </div>
      <button>회원가입</button>
    </form>
  );
};

export default SignUpForm;
