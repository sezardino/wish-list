import { MutationArguments, MutationReturn } from "@/libs/graphql/schema";
import { AbstractApiModule } from "../../helpers";
import { createListQuery } from "./queries/create-list";

export class ListApiModule extends AbstractApiModule {
  async create(dto: MutationArguments["createList"]) {
    return await this.gqlFetcher<
      Pick<MutationReturn, "createList">,
      MutationArguments["createList"]
    >(createListQuery, dto);
  }
}
