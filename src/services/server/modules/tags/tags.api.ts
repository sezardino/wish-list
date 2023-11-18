import { AbstractApi } from "../../helpers";
import { TagsListRequest, tagsListResponseSchema } from "./schema";

export class TagsApi extends AbstractApi {
  async list(params: TagsListRequest) {
    return await this.fetch({
      endpoint: "tags",
      config: { params },
      schema: tagsListResponseSchema,
    });
  }
}
