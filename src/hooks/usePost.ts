import request from "@/libs/axios";
import { useGlobalStore } from "@/store";
import { useCallback } from "react";

const usePost = (url: string) => {
  const access = useGlobalStore((state) => state.access);

  const postData = useCallback(
    async (data: any) => {
      const res = await request.post(url, data, {
        headers: {
          Authorization: access ? `Bearer ${access}` : null,
        },
      });
      return res.data;
    },
    [url, access]
  );

  return postData;
};

export default usePost;
