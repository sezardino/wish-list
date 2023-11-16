import { AbstractService } from "@/services/server/helpers";
import { CategoriesListRequest } from "./schema";

export class CategoriesService extends AbstractService {
  private categoriesArrayToStringArray(
    categories: { category: string | null }[]
  ) {
    return Array.from(
      new Set(
        categories.map((item) => (item.category === null ? "" : item.category))
      )
    );
  }

  async list(dto: CategoriesListRequest & { ownerId: string }) {
    const { type, ownerId } = dto;

    let allCategories: string[] = [];
    const itemCategories =
      typeof type === "undefined" || type === "ITEM"
        ? this.categoriesArrayToStringArray(
            await this.prismaService.item.findMany({
              select: { category: true },
              where: { ownerId },
            })
          )
        : [];
    const listCategories =
      typeof type === "undefined" || type === "LIST"
        ? this.categoriesArrayToStringArray(
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
