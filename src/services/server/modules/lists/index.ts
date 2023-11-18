import { PrismaService } from "@/libs/prisma";
import { AbstractModule } from "../../helpers";
import { ListsController } from "./lists.controller";
import { ListsService } from "./lists.service";

export class ListsModule
  implements AbstractModule<ListsController, ListsService>
{
  controller: ListsController;
  service: ListsService;

  constructor(private readonly prismaService: PrismaService) {
    this.service = new ListsService(prismaService);
    this.controller = new ListsController(this.service);
  }
}
