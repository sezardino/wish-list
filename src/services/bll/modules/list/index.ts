import { AbstractBllModule } from "../../helpers";
import { CreateListDto } from "./dto";

export class ListBllModule extends AbstractBllModule {
  create(dto: CreateListDto) {
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

  many(ownerId: string) {
    return this.prismaService.list.findMany({
      where: { ownerId },
      include: { items: true },
    });
  }
}
