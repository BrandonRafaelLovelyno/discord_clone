import fetcher from "@/lib/fetcher";
import {
  M_ServerResponse,
  S_ServerResponse,
  S_ServerWithRoleResponse,
} from "@/lib/types/api-response";
import useSWR from "swr";

const useServer = ({ serverId }: { serverId?: string }) => {
  if (serverId) {
    return useSWR<S_ServerWithRoleResponse>(
      `/api/server/${serverId!}`,
      fetcher,
      { refreshInterval: 2000 }
    );
  } else {
    return useSWR<M_ServerResponse>(`/api/server`, fetcher);
  }
};

export default useServer;
