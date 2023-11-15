import {
  TagsCategoriesRequest,
  tagsCategoriesResponseSchema,
} from "@/services/server/modules/common/schema";
import { AbstractApiModule } from "../../helpers";

export class CommonApiModule extends AbstractApiModule {
  async tagsAndCategories(params: TagsCategoriesRequest) {
    return await this.fetch({
      endpoint: "common/tags-categories",
      config: { params },
      schema: tagsCategoriesResponseSchema,
    });
  }
}
