import { apiService } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export const SIMPLE_LISTS_QUERY_KEY = "simple-lists";

export const useSimpleListsQuery = (enabled: boolean) =>
  useQuery({
    queryKey: [SIMPLE_LISTS_QUERY_KEY],
    queryFn: () => apiService.lists.simpleLists(),
    enabled,
  });
