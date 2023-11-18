import {
  CreateListRequest,
  createListResponseSchema,
} from "@/services/server/modules/lists/schema";
import {
  DashboardListsRequest,
  dashboardListsResponseSchema,
} from "@/services/server/modules/lists/schema/dashboard";
import { AbstractApiModule } from "../helpers";

export class ListsApiModule extends AbstractApiModule {
  async create(data: CreateListRequest) {
    return await this.fetch({
      endpoint: "lists",
      config: { method: "POST", data },
      schema: createListResponseSchema,
    });
  }

  async simpleLists() {
    return;
  }

  async dashboard(params: DashboardListsRequest) {
    return await this.fetch({
      endpoint: "lists/dashboard",
      config: { params },
      schema: dashboardListsResponseSchema,
    });
  }
}
