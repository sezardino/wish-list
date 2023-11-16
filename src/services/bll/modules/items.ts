import { CreateItemRequest } from "@/services/server/modules/items/schema";
import { AbstractBllModule } from "../helpers";

export class ItemsBllModule extends AbstractBllModule {
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
