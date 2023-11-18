import { apiService } from "@/services/api";
import { CategoriesListRequest } from "@/services/server/modules/categories/schema";
import { useQuery } from "@tanstack/react-query";

export const CATEGORIES_LIST_QUERY_KEY = "tags-and-categories";

type UseCategoriesListQueryParams = CategoriesListRequest & {
  enabled: boolean;
};

export const useCategoriesListQuery = (
  { enabled, ...params }: UseCategoriesListQueryParams = { enabled: false }
) =>
  useQuery({
    queryKey: [CATEGORIES_LIST_QUERY_KEY, ...Object.values(params)],
    queryFn: () => apiService.categories.list(params),
    refetchOnWindowFocus: false,
    enabled: enabled,
  });
