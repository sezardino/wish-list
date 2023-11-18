import { PrismaService } from "@/libs/prisma";
import { AbstractModule } from "../../helpers";
import { TagsApi } from "./tags.api";
import { TagsController } from "./tags.controller";
import { TagsService } from "./tags.service";

export class TagsModule
  implements AbstractModule<TagsController, TagsService, TagsApi>
{
  controller: TagsController;
  service: TagsService;
  api: TagsApi;

  constructor(private readonly prismaService: PrismaService) {
    this.service = new TagsService(prismaService);
    this.controller = new TagsController(this.service);
    this.api = new TagsApi();
  }
}
