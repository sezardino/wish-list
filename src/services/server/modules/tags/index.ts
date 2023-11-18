import { PrismaService } from "@/libs/prisma";
import { AbstractModule } from "../../helpers";
import { TagsController } from "./tags.controller";
import { TagsService } from "./tags.service";

export class TagsModule implements AbstractModule<TagsController, TagsService> {
  controller: TagsController;
  service: TagsService;

  constructor(private readonly prismaService: PrismaService) {
    this.service = new TagsService(prismaService);
    this.controller = new TagsController(this.service);
  }
}
