import useSgisFetch from "@/hooks/useSgisFetch";
import { SgisData } from "@/types/sgisData";
import { useEffect, useState } from "react";

const useCounselorFilter = () => {
  const [areaCode, setAreaCode] = useState<{
    city: string;
    town: string;
    village: string;
  }>({ city: "", town: "", village: "" });

  const {
    data: accessToken,
    isLoading: accessTokenLoading,
    error: accessTokenError,
  } = useSgisFetch<string>(
    `/OpenAPI3/auth/authentication.json`,
    {
      queryKey: ["access"],
      refetchInterval: 1000 * 60 * 60 * 5,
      refetchIntervalInBackground: true,
      select: (data: { accessToken: string }) => {
        return data.accessToken;
      },
    },
    {
      params: {
        consumer_key: import.meta.env.VITE_CONSUMER_KEY,
        consumer_secret: import.meta.env.VITE_CONSUMER_SECRET,
      },
    }
  );

  const {
    data: cityList,
    isLoading: cityListIsLoading,
    error: cityListError,
  } = useSgisFetch<SgisData[]>(
    "/OpenAPI3/addr/stage.json",
    {
      queryKey: ["city"],
      enabled: !!accessToken,
    },
    { params: { accessToken: accessToken } }
  );

  const {
    data: townList,
    refetch: refetchTown,
    remove: removeTown,
  } = useSgisFetch<SgisData[]>(
    "/OpenAPI3/addr/stage.json",
    {
      queryKey: ["town"],
      enabled: !!areaCode.city,
    },
    {
      params: {
        accessToken: accessToken,
        cd: areaCode.city,
      },
    }
  );

  const {
    data: villageList,
    refetch: refetchVillage,
    remove: removeVillage,
  } = useSgisFetch<SgisData[]>(
    "/OpenAPI3/addr/stage.json",
    {
      queryKey: ["village"],
      enabled: !!areaCode.town,
    },
    {
      params: { accessToken: accessToken, cd: areaCode.town },
    }
  );

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value);
    setAreaCode((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  };

  useEffect(() => {
    setAreaCode((state) => ({ ...state, town: "", village: "" }));
    if (areaCode.city) {
      refetchTown();
      removeVillage();
    } else {
      removeTown();
      removeVillage();
    }
  }, [areaCode.city]);

  useEffect(() => {
    setAreaCode((state) => ({ ...state, village: "" }));
    if (areaCode.town) refetchVillage();
    else removeVillage();
  }, [areaCode.town]);

  return { cityList, townList, villageList, handleOptionChange };
};

export default useCounselorFilter;
