import { BllService } from "@/services/bll";
import { NextRequest, NextResponse } from "next/server";
import { BackendErrorResponse } from "../..";
import { AbstractServerModule } from "../../helpers";
import { createListRequestSchema } from "./schema";

export class ListServerModule extends AbstractServerModule {
  constructor(private readonly bllService: BllService) {
    super();
  }

  async create(
    req: NextRequest
  ): Promise<BackendErrorResponse | NextResponse<{ create: boolean }>> {
    const body = await req.json();

    const { response, dto, session } = await this.handlerHelper({
      data: body,
      schema: createListRequestSchema,
    });

    if (response) return response;

    try {
      const createListResponse = await this.bllService.lists.create({
        ownerId: session?.user.id!,
        ...dto!,
      });

      return this.getNextResponse({ create: !!createListResponse }, 200);
    } catch (error) {
      return this.getNextResponse({ message: "backend-errors.server" }, 500);
    }
  }
}
