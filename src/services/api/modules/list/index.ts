import {
  MutationArguments,
  MutationReturn,
  QueryArguments,
  QueryReturn,
} from "@/libs/graphql";
import { AbstractApiModule } from "../../helpers";
import { createListQuery } from "./queries/create-list";
import { simpleListsQuery } from "./queries/simple-lists";

export class ListApiModule extends AbstractApiModule {
  async create(dto: MutationArguments["createList"]) {
    return await this.gqlFetcher<
      Pick<MutationReturn, "createList">,
      MutationArguments["createList"]
    >(createListQuery, dto);
  }

  async simpleLists() {
    return await this.gqlFetcher<
      Pick<QueryReturn, "lists">,
      QueryArguments["lists"]
    >(simpleListsQuery);
  }
}
