import { QueryReturn } from "@/libs/graphql";
import { AbstractApiModule } from "../../helpers";
import { tagsAndQueriesQuery } from "./queries/tags-and-categories";
import { TagsAndCategoriesRequest } from "./type";

export class CommonApiModule extends AbstractApiModule {
  async tagsAndCategories(dto: TagsAndCategoriesRequest) {
    return await this.gqlFetcher<
      Pick<QueryReturn, "categories" | "tags">,
      TagsAndCategoriesRequest
    >(tagsAndQueriesQuery, dto);
  }
}
