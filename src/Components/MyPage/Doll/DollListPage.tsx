import DollList from "./DollList";
import useDollListPage from "@/Logic/Components/MyPage/Doll/useDollListPage";

const DollListPage = () => {
  const { enrollDoll } = useDollListPage();
  return (
    <>
      <div>
        <h1>인형 / 아이 조회</h1>
        <button onClick={enrollDoll}>추가하기</button>
      </div>
      <DollList enroll={enrollDoll} />
    </>
  );
};

export default DollListPage;
