import { AbstractBllModule } from "../../helpers";
import { CategoriesDto, TagsDto } from "./dto";

export class CommonBllModule extends AbstractBllModule {
  async tags(dto: TagsDto) {
    const { type, ownerId } = dto;

    let allTags: string[] = [];

    if (type === "ITEM") {
      const itemTags = await this.prismaService.item.findMany({
        select: { tags: true },
        where: { ownerId },
      });

      allTags = Array.from(new Set(itemTags.map((item) => item.tags).flat()));
    } else if (type === "LIST") {
      const listTags = await this.prismaService.list.findMany({
        select: { tags: true },
        where: { ownerId },
      });

      allTags = Array.from(new Set(listTags.map((item) => item.tags).flat()));
    } else {
      const itemTags = await this.prismaService.item.findMany({
        select: { tags: true },
        where: { ownerId },
      });
      const listTags = await this.prismaService.list.findMany({
        select: { tags: true },
        where: { ownerId },
      });

      allTags = Array.from(
        new Set([
          ...listTags.map((item) => item.tags).flat(),
          ...itemTags.map((item) => item.tags).flat(),
        ])
      );
    }

    return allTags;
  }

  async categories(dto: CategoriesDto) {
    const { type, ownerId } = dto;

    let allCategories: string[] = [];

    if (type === "ITEM") {
      const itemCategories = await this.prismaService.item.findMany({
        select: { category: true },
        where: { ownerId },
      });

      allCategories = Array.from(
        new Set(
          itemCategories.map((item) =>
            item.category === null ? "" : item.category
          )
        )
      );
    } else if (type === "LIST") {
      const listCategories = await this.prismaService.list.findMany({
        select: { category: true },
        where: { ownerId },
      });

      allCategories = Array.from(
        new Set(
          listCategories.map((item) =>
            item.category === null ? "" : item.category
          )
        )
      );
    } else {
      const itemCategories = await this.prismaService.item.findMany({
        select: { category: true },
        where: { ownerId },
      });
      const listCategories = await this.prismaService.list.findMany({
        select: { category: true },
        where: { ownerId },
      });

      allCategories = Array.from(
        new Set([
          ...listCategories.map((item) =>
            item.category === null ? "" : item.category
          ),
          ...itemCategories.map((item) =>
            item.category === null ? "" : item.category
          ),
        ])
      );
    }
    console.log(allCategories);
    return allCategories;
  }
}
