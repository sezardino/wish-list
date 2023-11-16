import {
  CreateListRequest,
  createListResponseSchema,
} from "@/services/server/modules/list/schema";
import { AbstractApiModule } from "../helpers";

export class ListApiModule extends AbstractApiModule {
  async create(data: CreateListRequest) {
    return await this.fetch({
      endpoint: "/lists",
      config: { method: "POST", data },
      schema: createListResponseSchema,
    });
  }

  async simpleLists() {
    return;
  }
}
