import instance from "@/axios-instance/instance";
import { useQuery } from "@tanstack/react-query";
import { ApiResponse } from "@/@types/ApiResponse";

type HttpMethod = "get" | "post" | "put" | "patch" | "delete";

interface FetchDataProps<P> {
  endpoint: string;
  method?: HttpMethod;
  params?: P;
  body?: any;
  staleTime?: number;
  enabled?: boolean;
}

export function fetchData<T, P = Record<string, any>>({
  endpoint,
  method = "get",
  params,
  body,
  staleTime = 0,
  enabled = true,
}: FetchDataProps<P>) {
  return useQuery<ApiResponse<T>>({
    queryKey: [endpoint, params, method],
    queryFn: async () => {
      const response = await instance.request<ApiResponse<T>>({
        url: endpoint,
        method,
        params,
        data: body,
      });

      return response.data;
    },
    staleTime,
    enabled,
  });
}
