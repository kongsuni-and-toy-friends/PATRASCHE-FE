import { useState } from "react";
import RecordFilter from "./RecordFilter";
import useFetch from "@/hooks/useFetch";
import { Record } from "@/types/record";
import { Reservation } from "@/types/reservation";
import RecordList from "./RecordList";
import ReservationList from "./ReservationList";

const RecordPage = () => {
  const [isRecordSelected, setIsRecordSelected] = useState(true);
  const { data: records } = useFetch<Record[]>("/reservation/post", {
    queryKey: ["record"],
    select: (data: { response: Record[] }) => data.response,
  });
  const { data: reservations } = useFetch<Reservation[]>("/reservation/pre", {
    queryKey: ["reservation"],
    select: (data: { response: Reservation[] }) => data.response,
  });
  return (
    <>
      <RecordFilter
        isRecordSelected={isRecordSelected}
        setIsRecordSelected={setIsRecordSelected}
      />
      {isRecordSelected ? (
        <RecordList list={records} />
      ) : (
        <ReservationList list={reservations} />
      )}
    </>
  );
};

export default RecordPage;
