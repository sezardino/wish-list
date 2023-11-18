import { AbstractApi } from "../../helpers";
import { CategoriesListRequest, categoriesListResponseSchema } from "./schema";

export class CategoriesApi extends AbstractApi {
  async list(params: CategoriesListRequest) {
    return await this.fetch({
      endpoint: "categories",
      config: { params },
      schema: categoriesListResponseSchema,
    });
  }
}
