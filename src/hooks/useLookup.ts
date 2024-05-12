import { UseQueryReturnType, useQuery } from "@tanstack/vue-query";
import useFetch from "./useFetch";

export default function useLookup<T = any>(
  key: string
): UseQueryReturnType<T, Error> {
  const fetch = useFetch();

  const query = useQuery({
    queryKey: ["LOOKUP_" + key],
    queryFn: async () => {
      const res = await fetch.get("api/lookups/" + key);
      return res.data;
    },
  });

  return query;
}
