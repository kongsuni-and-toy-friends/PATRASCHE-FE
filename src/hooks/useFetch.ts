import request from "@/libs/axios";
import { useAuthStore } from "@/store";
import { useCallback } from "react";

function useFetch(url: string) {
  const access = useAuthStore((state) => state.access);

  const fetchData = useCallback(async () => {
    const res = await request.get(url, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });
    return res.data;
  }, [url, access]);

  return fetchData;
}

export default useFetch;
