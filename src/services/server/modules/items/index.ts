import { PrismaService } from "@/libs/prisma";
import { AbstractModule } from "../../helpers";
import { ItemsController } from "./items.controller";
import { ItemsService } from "./items.service";

export class ItemsModule
  implements AbstractModule<ItemsController, ItemsService>
{
  controller: ItemsController;
  service: ItemsService;

  constructor(private readonly prismaService: PrismaService) {
    this.service = new ItemsService(prismaService);
    this.controller = new ItemsController(this.service);
  }
}
