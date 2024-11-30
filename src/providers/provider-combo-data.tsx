import { useQuery } from "@tanstack/react-query";
import instance from "../lib/api/axios";

export interface Combo {
  value: string;
  label: string;
}

function ProviderComboData({
  children,
  endpoint,
}: {
  children: (data: Array<Combo>) => React.ReactNode;
  queryKey: string;
  endpoint: string;
}) {
  const { data } = useQuery({
    queryKey: [],
    queryFn: async () => {
      const params = new URLSearchParams();
      const { data } = await instance.get(endpoint + "?" + params.toString());
      return data.data as Array<{ value: string; label: string }>;
    },
  });

  return children(data ? data : []);
}

export default ProviderComboData;
