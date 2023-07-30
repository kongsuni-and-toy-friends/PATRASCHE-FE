import { CounselorInfo } from "@/types/counselorInfo";
import { memo } from "react";
import Star from "../UI/Star";
import { Link } from "react-router-dom";

interface CounselorListItemProps {
  counselor: CounselorInfo;
}

const CounselorListItem = memo(({ counselor }: CounselorListItemProps) => {
  return (
    <div className="border-black border-b-2">
      <h1 className="text-2xl">{counselor.name}</h1>
      <div>
        <span>전문분야: </span>
        {counselor.category.map((eachCategory, index) => (
          <span key={index}>{eachCategory} </span>
        ))}
      </div>
      <div>
        <span>위치: </span>
        <span>{counselor.location}</span>
      </div>
      <Star rate={3.3} />
      <Link to={`${counselor.id}`}>자세히 보기</Link>
      {/* <span>{JSON.stringify(counselor)}</span> */}
    </div>
  );
});

export default CounselorListItem;
