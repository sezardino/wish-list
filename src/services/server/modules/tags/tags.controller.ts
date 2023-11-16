import { BackendErrorResponse } from "@/types";
import { NextRequest, NextResponse } from "next/server";
import { AbstractController } from "../../helpers";
import { TagsListResponse, tagsListRequestSchema } from "./schema";
import { TagsService } from "./tags.service";

export class TagsController extends AbstractController<TagsService> {
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
      const tagsResponse = await this.service.list({
        type: dto!.type!,
        ownerId: session?.user.id!,
      });

      return this.getNextResponse({ tags: tagsResponse }, 200);
    } catch (error) {
      return this.getNextResponse({ message: "backend-errors.server" }, 500);
    }
  }
}
