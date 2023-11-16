import { AbstractService } from "@/services/server/helpers";
import { Prisma } from "@prisma/client";
import { CreateListRequest } from "./schema";

type ManyListsProps = {
  where: Prisma.ListWhereInput;
  select?: Prisma.ListSelect;
  include?: Prisma.ListInclude;
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

  many(props: ManyListsProps) {
    return this.prismaService.list.findMany(props);
  }
}
