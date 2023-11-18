import { AbstractApi } from "../../helpers";
import {
  IsLoginAvailableRequest,
  isLoginAvailableResponseSchema,
} from "./schema";

export class UsersApi extends AbstractApi {
  async isLoginAvailable(params: IsLoginAvailableRequest) {
    return await this.fetch({
      endpoint: "users/is-login-available",
      config: { params },
      schema: isLoginAvailableResponseSchema,
    });
  }
}
