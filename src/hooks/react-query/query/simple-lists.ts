import { apiService } from "@/services/api";
import { SimpleListsRequest } from "@/services/server/modules/lists/schema";
import { useQuery } from "@tanstack/react-query";

export const SIMPLE_LISTS_QUERY_KEY = "simple-lists";

export const useSimpleListsQuery = (
  params: SimpleListsRequest,
  enabled: boolean
) =>
  useQuery({
    queryKey: [SIMPLE_LISTS_QUERY_KEY],
    queryFn: () => apiService.lists.simpleLists(params),
    enabled,
  });
