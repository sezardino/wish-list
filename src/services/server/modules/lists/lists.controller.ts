import { BackendErrorResponse } from "@/types";
import { NextRequest, NextResponse } from "next/server";
import { AbstractController } from "../../helpers";
import { ListsService } from "./lists.service";
import { createListRequestSchema, simpleListsRequestSchema } from "./schema";
import { dashboardListsRequestSchema } from "./schema/dashboard";

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

      return this.getNextResponse({ create: !!createListResponse }, 201);
    } catch (error) {
      return this.getNextResponse({ message: "backend-errors.server" }, 500);
    }
  }

  async dashboard(req: NextRequest) {
    const params = this.formatParams(req.nextUrl.searchParams.entries());

    const { response, dto, session } = await this.handlerHelper({
      data: params,
      schema: dashboardListsRequestSchema,
    });

    if (response) return response;

    try {
      const serviceResponse = await this.service.many({
        dto: dto!,
        where: { ownerId: session?.user.id! },
        select: {
          id: true,
          name: true,
          category: true,
          description: true,
          icon: true,
          tags: true,
          createdAt: true,
          updatedAt: true,
          _count: {
            select: { items: true },
          },
        },
      });

      return this.getNextResponse(serviceResponse, 200);
    } catch (error) {
      return this.getNextResponse({ message: "backend-errors.server" }, 500);
    }
  }

  async simple(req: NextRequest) {
    const params = this.formatParams(req.nextUrl.searchParams.entries());

    const { response, dto, session } = await this.handlerHelper({
      data: params,
      schema: simpleListsRequestSchema,
    });

    if (response) return response;

    try {
      const serviceResponse = await this.service.many({
        dto: dto!,
        where: { ownerId: session?.user.id! },
        select: {
          id: true,
          name: true,
        },
      });

      return this.getNextResponse(serviceResponse, 200);
    } catch (error) {
      return this.getNextResponse({ message: "backend-errors.server" }, 500);
    }
  }
}
