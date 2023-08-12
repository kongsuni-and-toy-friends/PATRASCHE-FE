import { Doll } from "@/types/doll";
import { memo } from "react";

interface ChildListItemProps {
  doll: Doll;
  isSelected: boolean;
  onClick: () => void;
}

const ChildListItem = memo(
  ({ doll, isSelected, onClick }: ChildListItemProps) => {
    return (
      <div
        className="h-20 flex items-center hover:cursor-pointer"
        onClick={onClick}
      >
        <span className="mx-40">{doll.name}</span>
        {isSelected && <span>&gt;</span>}
      </div>
    );
  }
);

export default ChildListItem;
