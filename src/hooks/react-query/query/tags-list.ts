import { serverService } from "@/services/server";
import { TagsListRequest } from "@/services/server/modules/tags/schema";
import { useQuery } from "@tanstack/react-query";

export const TAGS_LIST_QUERY_KEY = "tags-list";

type UseTagsListQueryParams = TagsListRequest & {
  enabled: boolean;
};

export const useTagsListQuery = (
  { enabled, ...params }: UseTagsListQueryParams = { enabled: false }
) =>
  useQuery({
    queryKey: [TAGS_LIST_QUERY_KEY, ...Object.values(params)],
    queryFn: () => serverService.tags.api.list(params),
    refetchOnWindowFocus: false,
    enabled: enabled,
  });
