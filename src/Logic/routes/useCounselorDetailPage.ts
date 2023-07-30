import useFetch from "@/hooks/useFetch";
import { CounselorDetail } from "@/types/counselorDetail";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useParams } from "react-router-dom";

const useCounselorDetailPage = () => {
  const params = useParams();
  const id = useMemo(() => params.id, []);
  const fetchCounselorDetail = useFetch(`/counselor/${id}`);
  const { data, isLoading, error } = useQuery<CounselorDetail>(
    ["counselor", params.id],
    fetchCounselorDetail
  );

  return { data, isLoading, error };
};

export default useCounselorDetailPage;
