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
    const { page, limit, type, ownerId } = dto;

    const findManyArgs = {
      select: { category: true },
      where: { ownerId },
    };

    let allCategories = [];
    const itemCategories =
      typeof type === "undefined" || type === "ITEM"
        ? await this.prismaService.item.findMany(findManyArgs)
        : [];
    const listCategories =
      typeof type === "undefined" || type === "LIST"
        ? await this.prismaService.list.findMany(findManyArgs)
        : [];

    if (type === "ITEM") {
      allCategories = itemCategories;
    } else if (type === "LIST") {
      allCategories = listCategories;
    } else {
      allCategories = [...listCategories, ...itemCategories];
    }

    const categories = Array.from(
      new Set(this.categoriesArrayToStringArray(allCategories))
    );

    const { skip, take, meta } = this.getPagination({
      page,
      limit,
      count: categories.length,
    });

    return { categories: categories.slice(skip, skip + take), meta };
  }
}
