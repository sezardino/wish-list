import {
  CreateItemRequest,
  createItemResponseSchema,
} from "@/services/server/modules/item/schema";
import { AbstractApiModule } from "../helpers";

export class ItemApiModule extends AbstractApiModule {
  async create(data: CreateItemRequest) {
    return await this.fetch({
      endpoint: "items",
      config: { method: "POST", data },
      schema: createItemResponseSchema,
    });
  }
}
