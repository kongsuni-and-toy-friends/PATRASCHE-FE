import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const request = axios.create({ baseURL: "https://sgisapi.kostat.go.kr" });

const useSgisFetch = <TData>(
  url: string,
  reactQueryConfig: any,
  axiosConfig: any
) => {
  const fetchData = async () => {
    const res = await request.get(url, { ...axiosConfig });
    return res.data.result;
  };
  const { data, isLoading, error, refetch, remove } = useQuery<TData>({
    ...reactQueryConfig,
    queryFn: fetchData,
  });
  return { data, isLoading, error, refetch, remove };
};

export default useSgisFetch;
