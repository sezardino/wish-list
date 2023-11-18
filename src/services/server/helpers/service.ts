import { PrismaService } from "@/libs/prisma";

export abstract class AbstractService {
  constructor(protected readonly prismaService: PrismaService) {}

  getPagination(page = 0, limit = 10, totalCount: number) {
    const totalPages = Math.ceil(totalCount / limit);

    return {
      skip: page * limit,
      take: limit,
      meta: {
        totalPages,
        page: page + 1,
        limit,
        count: totalCount,
      },
    };
  }
}
