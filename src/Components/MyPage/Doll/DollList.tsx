import Line from "@/Components/UI/Line";
import useFetch from "@/hooks/useFetch";
import { Doll } from "@/types/doll";

interface DollListProps {
  enroll: () => void;
}

const DollList = ({ enroll }: DollListProps) => {
  const {
    data: dolls,
    isLoading,
    error,
  } = useFetch<Doll[]>("/child", {
    queryKey: ["child"],
    select: (data: { response: Doll[] }) => data.response,
  });

  if (isLoading) return <h1>로딩 중</h1>;
  if (error) return <h1>에러 발생</h1>;
  if (!dolls || dolls.length === 0) {
    return (
      <>
        <h1>등록된 인형이 없습니다.</h1>
        <button onClick={enroll}>등록하기</button>
      </>
    );
  }
  return (
    <ul className="w-3/4 mx-auto text-center">
      <li className="flex  justify-around">
        <div className="w-1/3">아이 이름</div>
        <div className="w-1/3">인형 이름</div>
        <div className="w-1/3">삭제</div>
      </li>
      <Line />
      {dolls.map((doll) => (
        <li key={doll.id} className="flex justify-around">
          <div className="w-1/3">{doll.name}</div>
          <div className="w-1/3">{doll.doll}</div>
          <button className="w-1/3">삭제</button>
        </li>
      ))}
    </ul>
  );
};

export default DollList;
