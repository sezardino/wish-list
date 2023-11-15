import { apiService } from "@/services/api";
import { TagsCategoriesRequest } from "@/services/server";
import { useQuery } from "@tanstack/react-query";

export const TAGS_AND_CATEGORIES_QUERY_KEY = "tags-and-categories";

type UseTagsAndCategoriesQueryParams = TagsCategoriesRequest & {
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
