import { BackendErrorResponse } from "@/types";
import { NextRequest, NextResponse } from "next/server";
import { AbstractController } from "../../helpers";
import { CategoriesService } from "./categories.service";
import { CategoriesListResponse, categoriesListRequestSchema } from "./schema";

export class CategoriesController extends AbstractController<CategoriesService> {
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
      const categoriesResponse = await this.service.list({
        type: dto!.type!,
        ownerId: session?.user.id!,
      });

      return this.getNextResponse({ categories: categoriesResponse }, 200);
    } catch (error) {
      return this.getNextResponse({ message: "backend-errors.server" }, 500);
    }
  }
}
