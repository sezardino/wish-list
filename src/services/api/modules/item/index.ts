import { MutationArguments, MutationReturn } from "@/libs/graphql";
import { AbstractApiModule } from "../../helpers";
import { createItemQuery } from "./queries/create-item";

export class ItemApiModule extends AbstractApiModule {
  async create(dto: MutationArguments["createItem"]) {
    return await this.gqlFetcher<
      Pick<MutationReturn, "createItem">,
      MutationArguments["createItem"]
    >(createItemQuery, dto);
  }
}
