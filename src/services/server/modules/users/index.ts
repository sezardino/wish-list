import { PrismaService } from "@/libs/prisma";
import { AbstractModule } from "@/services/server/helpers";
import { UsersApi } from "./users.api";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

export class UsersModule
  implements AbstractModule<UsersController, UsersService, UsersApi>
{
  controller: UsersController;
  service: UsersService;
  api: UsersApi;

  constructor(private readonly prismaService: PrismaService) {
    this.service = new UsersService(prismaService);
    this.controller = new UsersController(this.service);
    this.api = new UsersApi();
  }
}
