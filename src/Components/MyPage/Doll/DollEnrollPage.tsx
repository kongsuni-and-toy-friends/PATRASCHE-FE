import Backdrop from "@/Components/UI/Backdrop";
import useDollEnrollPage from "@/Logic/Components/MyPage/Doll/useDollEnrollPage";

const DollEnrollPage = () => {
  const {
    info,
    handleInputChange,
    enrollDoll,
    isConnectionFormOpened,
    openConnectionForm,
    closeConnectionForm,
    // checkPin,
  } = useDollEnrollPage();

  // const backdropRoot = document.getElementById("backdrop") as HTMLElement;
  // const modalRoot = document.getElementById("modal") as HTMLElement;
  return (
    <>
      {isConnectionFormOpened && (
        <>
          createPortal(
          <Backdrop onClick={closeConnectionForm} />, backdropRoot)
        </>
      )}
      <form onSubmit={enrollDoll}>
        <div>
          <label htmlFor="pin">인형 PIN 번호</label>
          <input
            type="text"
            id="pin"
            name="pin"
            value={info.pin}
            onChange={handleInputChange}
          />
          <button type="button" onClick={openConnectionForm}>
            연결하기
          </button>
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
