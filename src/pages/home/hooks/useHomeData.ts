import douyu from "@/servers/core/douyu";
import { useQuery } from "@tanstack/react-query";

export const useHomeData = () => {
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["homeRooms"],
    queryFn: async () => await douyu.getHomeRooms(1),
  });

  return {
    data,
    isLoading,
    isFetching,
    error,
  };
};
