import useFetch from "@/hooks/useFetch";
import { Doll } from "@/types/doll";
import { useState } from "react";
import ChildListItem from "./ChildListItem";

const AnalyzeBoard = () => {
  const {
    data: dolls,
    isLoading,
    error,
  } = useFetch<Doll[]>("/child", {
    queryKey: ["child"],
    select: (data: { response: Doll[] }) => data.response,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  const { data: analysis, refetch } = useFetch(
    `/child/${dolls![selectedIndex].id}/records`,
    {
      queryKey: ["analysis", dolls![selectedIndex].id],
      enabled: !!dolls,
    }
  );

  if (!dolls || dolls.length === 0)
    return (
      <>
        <h1>아직 인형이 없어요.</h1>
        <button>인형 등록하기</button>
      </>
    );

  return (
    <div className="min-h-[800px] border-black border-2 w-5/6 mx-auto flex">
      <div className="w-1/2 bg-pink-200">
        {dolls.map((doll, index) => {
          return (
            <ChildListItem
              key={doll.id}
              doll={doll}
              isSelected={index == selectedIndex}
              onClick={() => {
                setSelectedIndex(index);
                refetch();
              }}
            />
          );
        })}
      </div>
      <div className="w-1/2 bg-orange-500">{JSON.stringify(analysis)}</div>
    </div>
  );
};

export default AnalyzeBoard;
