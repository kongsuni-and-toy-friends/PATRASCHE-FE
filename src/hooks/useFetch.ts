import request from "@/libs/axios";
import { useGlobalStore } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { shallow } from "zustand/shallow";

function useFetch<TData>(
  url: string,
  reactQueryConfig: any,
  axiosConfig?: any
) {
  const access = useGlobalStore((state) => state.access, shallow);
  const fetchData = async (): Promise<TData> => {
    const res = await request.get(url, {
      ...axiosConfig,
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
