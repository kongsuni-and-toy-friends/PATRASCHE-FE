import Backdrop from "@/Components/UI/Backdrop";
import useDollEnrollPage from "@/Logic/Components/MyPage/Doll/useDollEnrollPage";
import { createPortal } from "react-dom";

const DollEnrollPage = () => {
  const {
    info,
    handleInputChange,
    enrollDoll,
    isConnectionFormOpened,
    // openConnectionForm,
    closeConnectionForm,
    isLoading,
    pinIsAvailable,
    refetch,
  } = useDollEnrollPage();

  if (isLoading) return <h1>아이를 등록중입니다.</h1>;
  const backdropRoot = document.getElementById("backdrop") as HTMLElement;
  // const modalRoot = document.getElementById("modal") as HTMLElement;
  return (
    <>
      {isConnectionFormOpened && (
        <>
          {createPortal(
            <Backdrop onClick={closeConnectionForm} />,
            backdropRoot
          )}
        </>
      )}
      <form onSubmit={enrollDoll} className="[&>div]:my-1">
        <div>
          <label htmlFor="pin">인형 PIN 번호</label>
          <input
            type="text"
            id="pin"
            name="pin"
            value={info.pin}
            onChange={handleInputChange}
          />
          <button type="button" onClick={() => refetch()}>
            연결하기
          </button>
        </div>
        <div className="h-4">
          {pinIsAvailable !== undefined &&
            (pinIsAvailable
              ? "사용 가능한 PIN 번호 입니다."
              : "이미 등록된 PIN 번호 입니다.")}
        </div>
        <div>
          <label htmlFor="name">아이 이름</label>
          <input
            type="text"
            id="name"
            name="name"
            value={info.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <input
            type="radio"
            id="male"
            name="gender"
            value="male"
            onChange={handleInputChange}
          />
          <label htmlFor="male" className="mx-2">
            남자
          </label>
          <input
            type="radio"
            id="female"
            name="gender"
            value="female"
            onChange={handleInputChange}
          />
          <label htmlFor="female" className="mx-2">
            여자
          </label>
        </div>
        <div>
          <label htmlFor="birth">아이 생일</label>
          <input
            type="date"
            id="birth"
            name="birth"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="doll">인형 이름</label>
          <input
            type="text"
            id="doll"
            name="doll"
            value={info.doll}
            onChange={handleInputChange}
          />
        </div>
        <button>등록하기</button>
      </form>
    </>
  );
};

export default DollEnrollPage;
