import { AbstractService } from "@/services/server/helpers";
import { TagsListRequest } from "./schema";

export class TagsService extends AbstractService {
  protected tagsArrayToStringArray(tags: { tags: string[] }[]) {
    return Array.from(new Set(tags.map((item) => item.tags).flat()));
  }

  async list(dto: TagsListRequest & { ownerId: string }) {
    const { page, limit, type, ownerId } = dto;

    const findManyArgs = {
      select: { tags: true },
      where: { ownerId },
    };

    let allTags = [];

    const itemTags =
      typeof type === "undefined" || type === "ITEM"
        ? await this.prismaService.item.findMany(findManyArgs)
        : [];
    const listTags =
      typeof type === "undefined" || type === "LIST"
        ? await this.prismaService.list.findMany(findManyArgs)
        : [];

    if (type === "ITEM") {
      allTags = itemTags;
    } else if (type === "LIST") {
      allTags = listTags;
    } else {
      allTags = [...listTags, ...itemTags];
    }

    const tags = Array.from(new Set(this.tagsArrayToStringArray(allTags)));

    const { meta, skip, take } = this.getPagination({
      page,
      limit,
      count: tags.length,
    });

    return { tags: tags.slice(skip, skip + take), meta };
  }
}
