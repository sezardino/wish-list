import { prisma } from "@/libs/prisma";
import { PrismaClient } from "@prisma/client";
import { AuthBllModule } from "./modules/auth";
import { CommonBllModule } from "./modules/common";
import { ItemBllModule } from "./modules/item";
import { ListBllModule } from "./modules/list";
import { UserBllModule } from "./modules/user";

export class BllService {
  user: UserBllModule;
  auth: AuthBllModule;
  item: ItemBllModule;
  list: ListBllModule;
  common: CommonBllModule;

  constructor(private readonly prisma: PrismaClient) {
    this.user = new UserBllModule(prisma);
    this.auth = new AuthBllModule(prisma, this.user);
    this.item = new ItemBllModule(prisma);
    this.list = new ListBllModule(prisma);
    this.common = new CommonBllModule(prisma);
  }
}

export const bllService = new BllService(prisma);
