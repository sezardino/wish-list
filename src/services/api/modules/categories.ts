import {
  CategoriesListRequest,
  categoriesListResponseSchema,
} from "@/services/server/modules/categories/schema";
import { AbstractApiModule } from "../helpers";

export class CategoriesApiModule extends AbstractApiModule {
  async list(params: CategoriesListRequest) {
    return await this.fetch({
      endpoint: "categories",
      config: { params },
      schema: categoriesListResponseSchema,
    });
  }
}
