import { bllService } from "../bll";
import {
  AuthServerModule,
  CategoriesServerModule,
  ItemServerModule,
  ListServerModule,
  TagsServerModule,
} from "./modules";

export * from "./modules";
export * from "./types";

class ServerService {
  auth: AuthServerModule;
  categories: CategoriesServerModule;
  tags: TagsServerModule;
  item: ItemServerModule;
  list: ListServerModule;

  constructor() {
    this.auth = new AuthServerModule(bllService);
    this.categories = new CategoriesServerModule(bllService);
    this.tags = new TagsServerModule(bllService);
    this.item = new ItemServerModule(bllService);
    this.list = new ListServerModule(bllService);
  }
}

export const serverService = new ServerService();
