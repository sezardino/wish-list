import { AbstractController } from "@/services/server/helpers";
import { NextRequest } from "next/server";
import { isLoginAvailableRequestSchema } from "./schema";
import { UsersService } from "./users.service";

export class UsersController extends AbstractController<UsersService> {
  async isLoginAvailable(req: NextRequest) {
    const params = this.formatParams(req.nextUrl.searchParams.entries());

    const { response, dto } = await this.handlerHelper({
      data: params,
      schema: isLoginAvailableRequestSchema,
      skipAuth: true,
    });

    if (response) return response;

    try {
      const bllResponse = await this.service.isLoginAvailable(dto!.login!);

      return this.getNextResponse({ available: bllResponse }, 200);
    } catch (error) {
      return this.getNextResponse({ message: "backend-errors.server" }, 500);
    }
  }
}
