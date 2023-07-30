import useFetch from "@/hooks/useFetch";
import { CounselorInfo } from "@/types/counselorInfo";
import { useQuery } from "@tanstack/react-query";

const useCounselorList = () => {
  const fetchCounselor = useFetch("/counselor");
  const { data, isLoading, error } = useQuery({
    queryKey: ["counselor"],
    queryFn: fetchCounselor,
    select: (data: { response: CounselorInfo[] }) => data.response,
  });

  return { data, isLoading, error };
};

export default useCounselorList;
