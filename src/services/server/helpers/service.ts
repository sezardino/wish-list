import { PrismaService } from "@/libs/prisma";

export abstract class AbstractService {
  constructor(protected readonly prismaService: PrismaService) {}
}
