import CounselorListItem from "./CounselorListItem";
import CounselorFilter from "./CounselorFilter";
import useFetch from "@/hooks/useFetch";
import { CounselorInfo } from "@/types/counselorInfo";

const counselorList = () => {
  const { data, isLoading, error } = useFetch<CounselorInfo[]>("/counselor", {
    queryKey: ["counselor"],
    select: (data: { response: CounselorInfo[] }) => data.response,
  });

  if (isLoading) return <>로딩 중</>;
  if (error) return <h1>에러 발생</h1>;

  if (!data)
    return (
      <div className="flex justify-center items-center min-h-[800px]">
        <h2>등록된 상담사가 존재하지 않아요.</h2>
      </div>
    );

  return (
    <div className="min-h-[800px] w-10/12 mx-auto border-2 border-black">
      <CounselorFilter />
      {data.map((counselor) => (
        <CounselorListItem key={counselor.id} counselor={counselor} />
      ))}
    </div>
  );
};

export default counselorList;
