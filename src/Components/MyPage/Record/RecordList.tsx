import { Record } from "@/types/Record";

interface RecordListProps {
  list: Record[] | undefined;
}

const RecordList = ({ list }: RecordListProps) => {
  if (!list || list.length === 0) return <h1>상담 기록이 없습니다.</h1>;
  return (
    <ul>
      {list.map((item) => (
        <li key={item.id}>{item.child}</li>
      ))}
    </ul>
  );
};

export default RecordList;
