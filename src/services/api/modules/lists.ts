import {
  CreateListRequest,
  SimpleListsRequest,
  createListResponseSchema,
  simpleListResponseSchema,
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

  async simpleLists(params: SimpleListsRequest) {
    return await this.fetch({
      endpoint: "lists/simple",
      config: { params },
      schema: simpleListResponseSchema,
    });
  }

  async dashboard(params: DashboardListsRequest) {
    return await this.fetch({
      endpoint: "lists/dashboard",
      config: { params },
      schema: dashboardListsResponseSchema,
    });
  }
}
