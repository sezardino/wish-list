import { PrismaService } from "@/libs/prisma";
import { AbstractModule } from "../../helpers";
import { ItemsApi } from "./items.api";
import { ItemsController } from "./items.controller";
import { ItemsService } from "./items.service";

export class ItemsModule
  implements AbstractModule<ItemsController, ItemsService, ItemsApi>
{
  controller: ItemsController;
  service: ItemsService;
  api: ItemsApi;

  constructor(private readonly prismaService: PrismaService) {
    this.service = new ItemsService(prismaService);
    this.controller = new ItemsController(this.service);
    this.api = new ItemsApi();
  }
}
