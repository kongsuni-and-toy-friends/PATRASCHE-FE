import { useMemo, useState } from "react";

interface RecordFilterProps {
  isRecordSelected: boolean;
  setIsRecordSelected: React.Dispatch<React.SetStateAction<boolean>>;
}

const RecordFilter = ({
  isRecordSelected,
  setIsRecordSelected,
}: RecordFilterProps) => {
  const recordClassName = useMemo(
    () =>
      `w-1/2 h-16 flex justify-center items-center border-black border hover:cursor-pointer ${
        isRecordSelected && "bg-gray-300"
      }`,
    [isRecordSelected]
  );

  const reservationClassName = useMemo(
    () =>
      `w-1/2 h-16 flex justify-center items-center border-black border hover:cursor-pointer ${
        !isRecordSelected && "bg-gray-300"
      }`,
    [isRecordSelected]
  );
  return (
    <div className="flex">
      <div
        className={recordClassName}
        onClick={() => setIsRecordSelected(true)}
      >
        기록
      </div>
      <div
        className={reservationClassName}
        onClick={() => setIsRecordSelected(false)}
      >
        예약
      </div>
    </div>
  );
};

export default RecordFilter;
