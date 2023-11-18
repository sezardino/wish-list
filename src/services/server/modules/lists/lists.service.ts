import { AbstractService } from "@/services/server/helpers";
import { Prisma } from "@prisma/client";
import { CreateListRequest, DashboardListsRequest } from "./schema";

type ManyListsProps = {
  where: Prisma.ListWhereInput;
  select?: Prisma.ListSelect;
  include?: Prisma.ListInclude;
  dto: DashboardListsRequest;
};

export class ListsService extends AbstractService {
  create(dto: CreateListRequest & { ownerId: string }) {
    const { name, ownerId, category, description, icon, tags } = dto;

    const filteredTags =
      (tags?.filter((tag) => tag !== null && tag !== undefined) as string[]) ||
      [];

    return this.prismaService.list.create({
      include: { items: true },
      data: {
        name,
        category,
        description: description || "",
        icon,
        tags: filteredTags,
        owner: {
          connect: { id: ownerId },
        },
      },
    });
  }

  async many(props: ManyListsProps) {
    const { dto, where, ...rest } = props;
    const { category, limit = 10, page = 0, search, tags } = dto;

    if (search) where.name = { contains: search, mode: "insensitive" };
    if (category) where.category = { contains: category, mode: "insensitive" };
    if (tags) where.tags = { hasEvery: tags };

    const count = await this.prismaService.list.count({ where });

    const { meta, skip, take } = this.getPagination(page, limit, count);

    const lists = await this.prismaService.list.findMany({
      ...rest,
      skip,
      take,
      where,
    });

    return { lists, meta };
  }
}
