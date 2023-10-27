import { PrismaClient } from "@prisma/client";

export abstract class AbstractBllModule {
  constructor(protected readonly prismaService: PrismaClient) {}
}
