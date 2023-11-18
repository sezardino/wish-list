import { AbstractApi } from "../../helpers";
import { CreateItemRequest, createItemResponseSchema } from "./schema";

export class ItemsApi extends AbstractApi {
  async create(data: CreateItemRequest) {
    return await this.fetch({
      endpoint: "items",
      config: { method: "POST", data },
      schema: createItemResponseSchema,
    });
  }
}
