import { BllService } from "@/services/bll";
import { NextRequest, NextResponse } from "next/server";
import { BackendErrorResponse } from "../..";
import { AbstractServerModule } from "../../helpers";
import { CategoriesListResponse, categoriesListRequestSchema } from "./schema";

export class CategoriesServerModule extends AbstractServerModule {
  constructor(private readonly bllService: BllService) {
    super();
  }

  async list(
    req: NextRequest
  ): Promise<BackendErrorResponse | NextResponse<CategoriesListResponse>> {
    const params = this.formatParams(req.nextUrl.searchParams.entries());

    const { response, dto, session } = await this.handlerHelper({
      data: params,
      schema: categoriesListRequestSchema,
    });

    if (response) return response;

    try {
      const categoriesResponse = await this.bllService.categories.list({
        type: dto!.type!,
        ownerId: session?.user.id!,
      });

      return this.getNextResponse({ categories: categoriesResponse }, 200);
    } catch (error) {
      return this.getNextResponse({ message: "backend-errors.server" }, 500);
    }
  }
}
