import useFetch from "@/hooks/useFetch";
import { CounselorDetail } from "@/types/counselorDetail";
import { useMemo } from "react";
import { useParams } from "react-router-dom";

const useCounselorDetailPage = () => {
  const params = useParams();
  const id = useMemo(() => params.id, []);
  const { data, isLoading, error } = useFetch<CounselorDetail>(
    `/counselor/${id}`,
    {
      queryKey: ["counselor", params.id],
    }
  );

  return { data, isLoading, error };
};

export default useCounselorDetailPage;
