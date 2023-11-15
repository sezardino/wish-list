import {
  IsLoginAvailableDto,
  RegistrationDto,
} from "@/services/server/modules/auth/schema";
import { AbstractApiModule } from "../../helpers";

export class AuthApiModule extends AbstractApiModule {
  async registration(data: RegistrationDto) {
    return await this.fetch<{ status: boolean }>("auth/registration", {
      data,
      method: "POST",
    });
  }

  async isLoginAvailable(params: IsLoginAvailableDto) {
    return await this.fetch<{ available: boolean }>(
      "users/is-login-available",
      { params }
    );
  }
}
