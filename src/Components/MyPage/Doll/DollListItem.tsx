import useDollListItem from "@/Logic/Components/MyPage/Doll/useDollListItem";
import { Doll } from "@/types/doll";
import { memo } from "react";

interface DollListItemProps {
  doll: Doll;
}

const DollListItem = memo(({ doll }: DollListItemProps) => {
  const { deleteDoll } = useDollListItem(doll);

  return (
    <li className="flex justify-around">
      <div className="w-1/3">{doll.name}</div>
      <div className="w-1/3">{doll.doll}</div>
      <button className="w-1/3" onClick={() => deleteDoll()}>
        삭제
      </button>
    </li>
  );
});

export default DollListItem;
