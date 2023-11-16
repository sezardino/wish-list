import {
  TagsListRequest,
  tagsListResponseSchema,
} from "@/services/server/modules/tags/schema";
import { AbstractApiModule } from "../helpers";

export class TagsApiModule extends AbstractApiModule {
  async list(params: TagsListRequest) {
    return await this.fetch({
      endpoint: "tags",
      config: { params },
      schema: tagsListResponseSchema,
    });
  }
}
