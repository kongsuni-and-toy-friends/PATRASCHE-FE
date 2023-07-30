import { SgisData } from "@/types/sgisData";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";

const useCounselorFilter = () => {
  const [areaCode, setAreaCode] = useState<{
    city: string;
    town: string;
    village: string;
  }>({ city: "", town: "", village: "" });

  const { data: accessToken } = useQuery(["access"], async () => {
    const res = await axios.get(
      `https://sgisapi.kostat.go.kr/OpenAPI3/auth/authentication.json?consumer_key=${
        import.meta.env.VITE_CONSUMER_KEY
      }&consumer_secret=${import.meta.env.VITE_CONSUMER_SECRET}`
    );
    return res.data.result.accessToken;
  });

  const { data: cityList } = useQuery<SgisData[]>(
    ["city"],
    async () => {
      const res = await axios.get(
        "https://sgisapi.kostat.go.kr/OpenAPI3/addr/stage.json",
        {
          params: {
            accessToken: accessToken,
          },
        }
      );
      return res.data.result;
    },
    { enabled: !!accessToken }
  );

  const {
    data: townList,
    refetch: refetchTown,
    remove: removeTown,
  } = useQuery<SgisData[]>(
    ["town"],
    async () => {
      const res = await axios.get(
        "https://sgisapi.kostat.go.kr/OpenAPI3/addr/stage.json",
        {
          params: {
            accessToken: accessToken,
            cd: areaCode.city,
          },
        }
      );
      return res.data.result;
    },
    { enabled: !!areaCode.city }
  );

  const {
    data: villageList,
    refetch: refetchVillage,
    remove: removeVillage,
  } = useQuery<SgisData[]>(
    ["village"],
    async () => {
      const res = await axios.get(
        "https://sgisapi.kostat.go.kr/OpenAPI3/addr/stage.json",
        {
          params: {
            accessToken: accessToken,
            cd: areaCode.town,
          },
        }
      );
      return res.data.result;
    },
    { enabled: !!areaCode.town }
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
