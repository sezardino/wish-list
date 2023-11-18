import {
  CreateItemRequest,
  createItemResponseSchema,
} from "@/services/server/modules/items/schema";
import { AbstractApiModule } from "../helpers";

export class ItemsApiModule extends AbstractApiModule {
  async create(data: CreateItemRequest) {
    return await this.fetch({
      endpoint: "items",
      config: { method: "POST", data },
      schema: createItemResponseSchema,
    });
  }
}
