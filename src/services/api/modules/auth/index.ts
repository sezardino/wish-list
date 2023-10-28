import {
  MutationArguments,
  MutationReturn,
  QueryArguments,
  QueryReturn,
} from "@/libs/graphql/schema";
import { AbstractApiModule } from "../../helpers";
import { isLoginAvailableQuery } from "./queries/is-login-available";
import { registrationQuery } from "./queries/registration";

export class AuthApiModule extends AbstractApiModule {
  async registration(dto: MutationArguments["registration"]) {
    return await this.gqlFetcher<
      Pick<MutationReturn, "registration">,
      MutationArguments["registration"]
    >(registrationQuery, dto);
  }

  async isLoginAvailable(dto: QueryArguments["isLoginAvailable"]) {
    return await this.gqlFetcher<
      Pick<QueryReturn, "isLoginAvailable">,
      QueryArguments["isLoginAvailable"]
    >(isLoginAvailableQuery, dto);
  }
}
