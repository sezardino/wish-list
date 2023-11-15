import { BllService } from "@/services/bll";
import { NextRequest } from "next/server";
import { isLoginAvailableRequestSchema, registrationRequestSchema } from "..";
import { AbstractServerModule } from "../../helpers";

export * from "./schema";

export class AuthServerModule extends AbstractServerModule {
  constructor(private readonly bllService: BllService) {
    super();
  }

  async registration(req: NextRequest) {
    const body = await req.json();
    const { response, dto } = await this.handlerHelper({
      data: body,
      schema: registrationRequestSchema,
      skipAuth: true,
    });

    if (response) return response;

    try {
      const bllResponse = await this.bllService.auth.registration(dto!);

      return this.getNextResponse({ success: bllResponse }, 201);
    } catch (error) {
      return this.getNextResponse({ message: "backend-errors.server" }, 500);
    }
  }

  async isLoginAvailable(req: NextRequest) {
    const params = this.formatParams(req.nextUrl.searchParams.entries());

    const { response, dto } = await this.handlerHelper({
      data: params,
      schema: isLoginAvailableRequestSchema,
      skipAuth: true,
    });

    if (response) return response;

    try {
      const bllResponse = await this.bllService.user.isLoginAvailable(
        dto!.login!
      );

      return this.getNextResponse({ available: bllResponse }, 200);
    } catch (error) {
      return this.getNextResponse({ message: "backend-errors.server" }, 500);
    }
  }
}
