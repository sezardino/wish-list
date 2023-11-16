import { AbstractService } from "@/services/server/helpers";
import { TagsListRequest } from "./schema";

export class TagsService extends AbstractService {
  protected tagsArrayToStringArray(tags: { tags: string[] }[]) {
    return Array.from(new Set(tags.map((item) => item.tags).flat()));
  }

  async list(dto: TagsListRequest & { ownerId: string }) {
    const { type, ownerId } = dto;

    let allTags: string[] = [];

    const itemTags =
      typeof type === "undefined" || type === "ITEM"
        ? this.tagsArrayToStringArray(
            await this.prismaService.item.findMany({
              select: { tags: true },
              where: { ownerId },
            })
          )
        : [];
    const listTags =
      typeof type === "undefined" || type === "LIST"
        ? this.tagsArrayToStringArray(
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
