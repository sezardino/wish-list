import { prisma } from "@/libs/prisma";
import { PrismaClient } from "@prisma/client";
import { UsersBllModule } from "./modules";
import { AuthBllModule } from "./modules/auth";
import { CategoriesBllModule } from "./modules/categories";
import { ItemsBllModule } from "./modules/items";
import { ListsBllModule } from "./modules/lists";
import { TagsBllModule } from "./modules/tags";

export class BllService {
  users: UsersBllModule;
  auth: AuthBllModule;
  items: ItemsBllModule;
  lists: ListsBllModule;
  categories: CategoriesBllModule;
  tags: TagsBllModule;

  constructor(private readonly prisma: PrismaClient) {
    this.users = new UsersBllModule(prisma);
    this.auth = new AuthBllModule(prisma, this.users);
    this.items = new ItemsBllModule(prisma);
    this.lists = new ListsBllModule(prisma);
    this.categories = new CategoriesBllModule(prisma);
    this.tags = new TagsBllModule(prisma);
  }
}

export const bllService = new BllService(prisma);
