import {
  RegistrationRequest,
  registrationResponseSchema,
} from "@/services/server/modules/auth/schema";
import {
  IsLoginAvailableRequest,
  isLoginAvailableResponseSchema,
} from "@/services/server/modules/users/schema";
import { AbstractApiModule } from "../helpers";

export class AuthApiModule extends AbstractApiModule {
  async registration(data: RegistrationRequest) {
    return await this.fetch({
      endpoint: "auth/registration",
      config: { data, method: "POST" },
      schema: registrationResponseSchema,
    });
  }

  async isLoginAvailable(params: IsLoginAvailableRequest) {
    return await this.fetch({
      endpoint: "users/is-login-available",
      config: { params },
      schema: isLoginAvailableResponseSchema,
    });
  }
}
