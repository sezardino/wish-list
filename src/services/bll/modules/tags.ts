import { TagsListRequest } from "@/services/server/modules/tags/schema";
import { AbstractBllModule } from "../helpers";

const tagsArrayToStringArray = (tags: { tags: string[] }[]) =>
  Array.from(new Set(tags.map((item) => item.tags).flat()));

export class TagsBllModule extends AbstractBllModule {
  async list(dto: TagsListRequest & { ownerId: string }) {
    const { type, ownerId } = dto;

    let allTags: string[] = [];

    const itemTags =
      typeof type === "undefined" || type === "ITEM"
        ? tagsArrayToStringArray(
            await this.prismaService.item.findMany({
              select: { tags: true },
              where: { ownerId },
            })
          )
        : [];
    const listTags =
      typeof type === "undefined" || type === "LIST"
        ? tagsArrayToStringArray(
            await this.prismaService.list.findMany({
              select: { tags: true },
              where: { ownerId },
            })
          )
        : [];

    if (type === "ITEM") {
      allTags = itemTags;
    } else if (type === "LIST") {
      allTags = listTags;
    } else {
      allTags = Array.from(new Set([...listTags, ...itemTags]));
    }

    return allTags;
  }
}
