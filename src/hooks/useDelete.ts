import request from "@/libs/axios";
import { useGlobalStore } from "@/store";
import { useMutation } from "@tanstack/react-query";

function useFetch<TData>(
  url: string,
  reactQueryConfig: any,
  axiosConfig?: any
) {
  const access = useGlobalStore((state) => state.access);
  const fetchData = async (): Promise<void> => {
    await request.delete(url, {
      ...axiosConfig,
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });
  };

  const { mutate, isLoading, error } = useMutation<TData>({
    ...reactQueryConfig,
    mutationFn: fetchData,
  });
  return { mutate, isLoading, error };
}

export default useFetch;
