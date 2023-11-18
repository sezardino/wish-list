import { AbstractApi } from "../../helpers";
import { RegistrationRequest, registrationResponseSchema } from "./schema";

export class AuthApi extends AbstractApi {
  async registration(data: RegistrationRequest) {
    return await this.fetch({
      endpoint: "auth/registration",
      config: { data, method: "POST" },
      schema: registrationResponseSchema,
    });
  }
}
