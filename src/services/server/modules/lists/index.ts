import { PrismaService } from "@/libs/prisma";
import { AbstractModule } from "../../helpers";
import { ListsApi } from "./lists.api";
import { ListsController } from "./lists.controller";
import { ListsService } from "./lists.service";

export class ListsModule
  implements AbstractModule<ListsController, ListsService, ListsApi>
{
  controller: ListsController;
  service: ListsService;
  api: ListsApi;

  constructor(private readonly prismaService: PrismaService) {
    this.service = new ListsService(prismaService);
    this.controller = new ListsController(this.service);
    this.api = new ListsApi();
  }
}
