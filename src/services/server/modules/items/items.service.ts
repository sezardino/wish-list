import { AbstractService } from "@/services/server/helpers";
import { CreateItemRequest } from "./schema";

export class ItemsService extends AbstractService {
  create(dto: CreateItemRequest & { ownerId: string }) {
    const { links, listId, averagePrice, description, ownerId, tags, ...rest } =
      dto;

    return this.prismaService.item.create({
      data: {
        ...rest,
        tags: Array.from(new Set(tags?.map((t) => (!!t ? t : "")))) || [],
        description: description || "",
        averagePrice: averagePrice || 0,
        list: {
          connect: {
            id: listId,
          },
        },
        links: {
          createMany: {
            data: links || [],
          },
        },
        owner: {
          connect: {
            id: ownerId,
          },
        },
      },
    });
  }
}
