import { apiService } from "@/services/api";
import { TagsAndCategoriesRequest } from "@/services/api/modules/common/type";
import { useQuery } from "@tanstack/react-query";

export const TAGS_AND_CATEGORIES_QUERY_KEY = "tags-and-categories";

type UseTagsAndCategoriesQueryParams = TagsAndCategoriesRequest & {
  enabled: boolean;
};

export const useTagsAndCategoriesQuery = (
  { enabled, ...params }: UseTagsAndCategoriesQueryParams = { enabled: false }
) =>
  useQuery({
    queryKey: [TAGS_AND_CATEGORIES_QUERY_KEY, ...Object.values(params)],
    queryFn: () => apiService.common.tagsAndCategories(params),
    refetchOnWindowFocus: false,
    enabled: enabled,
  });
