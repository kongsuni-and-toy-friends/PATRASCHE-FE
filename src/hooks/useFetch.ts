import request from "@/libs/axios";
import { useAuthStore } from "@/store";
import { useQuery } from "@tanstack/react-query";

function useFetch<TData>(url: string, reactQueryConfig: any) {
  const access = useAuthStore((state) => state.access);
  const fetchData = async (): Promise<TData> => {
    const res = await request.get(url, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });
    return res.data;
  };

  const { data, isLoading, error, refetch, remove } = useQuery<TData>({
    ...reactQueryConfig,
    queryFn: fetchData,
  });
  return { data, isLoading, error, refetch, remove };
}

export default useFetch;
