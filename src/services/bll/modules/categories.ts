import { CategoriesListRequest } from "@/services/server/modules/categories/schema";
import { AbstractBllModule } from "../helpers";

const categoriesArrayToStringArray = (
  categories: { category: string | null }[]
) =>
  Array.from(
    new Set(
      categories.map((item) => (item.category === null ? "" : item.category))
    )
  );

export class CategoriesBllModule extends AbstractBllModule {
  async list(dto: CategoriesListRequest & { ownerId: string }) {
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
