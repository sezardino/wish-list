import { AbstractApi } from "../../helpers";
import {
  CreateListRequest,
  DashboardListsRequest,
  SimpleListsRequest,
  createListResponseSchema,
  dashboardListsResponseSchema,
  simpleListResponseSchema,
} from "./schema";

export class ListsApi extends AbstractApi {
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
