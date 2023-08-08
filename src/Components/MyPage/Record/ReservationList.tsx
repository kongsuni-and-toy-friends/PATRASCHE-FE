import { Reservation } from "@/types/reservation";

interface ReservationListProps {
  list: Reservation[] | undefined;
}

const ReservationList = ({ list }: ReservationListProps) => {
  if (!list || list.length === 0) return <>예약 목록이 없습니다.</>;
  return (
    <ul>
      {list.map((item) => (
        <li key={item.id}>{item.child}</li>
      ))}
    </ul>
  );
};

export default ReservationList;
