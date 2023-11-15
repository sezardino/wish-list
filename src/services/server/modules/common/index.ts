import { BllService } from "@/services/bll";
import { NextRequest, NextResponse } from "next/server";
import { BackendErrorResponse } from "../..";
import { AbstractServerModule } from "../../helpers";
import { TagsCategoriesResponse, tagsCategoriesRequestSchema } from "./schema";

export * from "./schema";

export class CommonServerModule extends AbstractServerModule {
  constructor(private readonly bllService: BllService) {
    super();
  }

  async tagsCategories(
    req: NextRequest
  ): Promise<BackendErrorResponse | NextResponse<TagsCategoriesResponse>> {
    const params = this.formatParams(req.nextUrl.searchParams.entries());

    const { response, dto, session } = await this.handlerHelper({
      data: params,
      schema: tagsCategoriesRequestSchema,
    });

    if (response) return response;

    try {
      const categoriesResponse = await this.bllService.common.categories({
        type: dto!.type!,
        ownerId: session?.user.id!,
      });
      const tagsResponse = await this.bllService.common.tags({
        type: dto!.type!,
        ownerId: session?.user.id!,
      });

      return this.getNextResponse(
        { tags: tagsResponse, categories: categoriesResponse },
        200
      );
    } catch (error) {
      return this.getNextResponse({ message: "backend-errors.server" }, 500);
    }
  }
}
