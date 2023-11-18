import { PrismaService } from "@/libs/prisma";
import { AbstractModule } from "../../helpers";
import { CategoriesApi } from "./categories.api";
import { CategoriesController } from "./categories.controller";
import { CategoriesService } from "./categories.service";

export class CategoriesModule
  implements
    AbstractModule<CategoriesController, CategoriesService, CategoriesApi>
{
  controller: CategoriesController;
  service: CategoriesService;
  api: CategoriesApi;

  constructor(private readonly prismaService: PrismaService) {
    this.service = new CategoriesService(prismaService);
    this.controller = new CategoriesController(this.service);
    this.api = new CategoriesApi();
  }
}
