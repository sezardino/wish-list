import { BllService } from "@/services/bll";
import { NextRequest, NextResponse } from "next/server";
import { BackendErrorResponse } from "../..";
import { AbstractServerModule } from "../../helpers";
import { TagsListResponse, tagsListRequestSchema } from "./schema";

export * from "./schema";

export class TagsServerModule extends AbstractServerModule {
  constructor(private readonly bllService: BllService) {
    super();
  }

  async list(
    req: NextRequest
  ): Promise<BackendErrorResponse | NextResponse<TagsListResponse>> {
    const params = this.formatParams(req.nextUrl.searchParams.entries());

    const { response, dto, session } = await this.handlerHelper({
      data: params,
      schema: tagsListRequestSchema,
    });

    if (response) return response;

    try {
      const tagsResponse = await this.bllService.common.tags({
        type: dto!.type!,
        ownerId: session?.user.id!,
      });

      return this.getNextResponse({ tags: tagsResponse }, 200);
    } catch (error) {
      return this.getNextResponse({ message: "backend-errors.server" }, 500);
    }
  }
}
