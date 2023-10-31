import { AbstractBllModule } from "../../helpers";
import { CategoriesDto, TagsDto } from "./dto";

const tagsArrayToStringArray = (tags: { tags: string[] }[]) =>
  Array.from(new Set(tags.map((item) => item.tags).flat()));

const categoriesArrayToStringArray = (
  categories: { category: string | null }[]
) =>
  Array.from(
    new Set(
      categories.map((item) => (item.category === null ? "" : item.category))
    )
  );

export class CommonBllModule extends AbstractBllModule {
  async tags(dto: TagsDto) {
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

  async categories(dto: CategoriesDto) {
    const { type, ownerId } = dto;

    let allCategories: string[] = [];
    const itemCategories =
      typeof type === "undefined" || type === "ITEM"
        ? categoriesArrayToStringArray(
            await this.prismaService.item.findMany({
              select: { category: true },
              where: { ownerId },
            })
          )
        : [];
    const listCategories =
      typeof type === "undefined" || type === "LIST"
        ? categoriesArrayToStringArray(
            await this.prismaService.list.findMany({
              select: { category: true },
              where: { ownerId },
            })
          )
        : [];

    if (type === "ITEM") {
      allCategories = itemCategories;
    } else if (type === "LIST") {
      allCategories = listCategories;
    } else {
      allCategories = Array.from(
        new Set([...listCategories, ...itemCategories])
      );
    }

    return allCategories;
  }
}
