import { AbstractBllModule } from "../../helpers";
import { CreateItemDto } from "./dto";

export class ItemBllModule extends AbstractBllModule {
  create(dto: CreateItemDto) {
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
        owner: {
          connect: {
            id: ownerId,
          },
        },
      },
    });
  }
}
