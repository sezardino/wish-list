import { PrismaService, prisma } from "@/libs/prisma";
import {
  AuthModule,
  CategoriesModule,
  ItemsModule,
  ListsModule,
  TagsModule,
  UsersModule,
} from "./modules";

class Server {
  auth: AuthModule;
  tags: TagsModule;
  categories: CategoriesModule;
  lists: ListsModule;
  items: ItemsModule;
  users: UsersModule;

  constructor(private readonly prismaService: PrismaService) {
    this.tags = new TagsModule(prismaService);
    this.categories = new CategoriesModule(prismaService);
    this.lists = new ListsModule(prismaService);
    this.items = new ItemsModule(prismaService);
    this.users = new UsersModule(prismaService);
    this.auth = new AuthModule(prismaService, this.users.service);
  }
}

export const serverService = new Server(prisma);
