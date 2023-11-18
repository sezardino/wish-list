import { serverService } from "@/services/server";
import { DashboardListsRequest } from "@/services/server/modules/lists/schema/dashboard";
import { useQuery } from "@tanstack/react-query";

export const DASHBOARD_LISTS_QUERY_KEY = "dashboard-lists";

export const useDashboardListsQuery = (
  params: DashboardListsRequest = {},
  enabled = true
) =>
  useQuery({
    queryKey: [DASHBOARD_LISTS_QUERY_KEY, ...Object.values(params)],
    queryFn: () => serverService.lists.api.dashboard(params),
    refetchOnWindowFocus: false,
    enabled,
  });
