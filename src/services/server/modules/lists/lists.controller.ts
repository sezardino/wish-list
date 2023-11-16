import { BackendErrorResponse } from "@/types";
import { NextRequest, NextResponse } from "next/server";
import { AbstractController } from "../../helpers";
import { ListsService } from "./lists.service";
import { createListRequestSchema } from "./schema";

export class ListsController extends AbstractController<ListsService> {
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
      const createListResponse = await this.service.create({
        ownerId: session?.user.id!,
        ...dto!,
      });

      return this.getNextResponse({ create: !!createListResponse }, 200);
    } catch (error) {
      return this.getNextResponse({ message: "backend-errors.server" }, 500);
    }
  }
}
