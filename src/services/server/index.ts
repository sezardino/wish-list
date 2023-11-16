import { bllService } from "../bll";
import {
  AuthServerModule,
  CategoriesServerModule,
  ItemsServerModule,
  ListsServerModule,
  TagsServerModule,
} from "./modules";

export * from "./modules";
export * from "./types";

class ServerService {
  auth: AuthServerModule;
  categories: CategoriesServerModule;
  tags: TagsServerModule;
  items: ItemsServerModule;
  lists: ListsServerModule;

  constructor() {
    this.auth = new AuthServerModule(bllService);
    this.categories = new CategoriesServerModule(bllService);
    this.tags = new TagsServerModule(bllService);
    this.items = new ItemsServerModule(bllService);
    this.lists = new ListsServerModule(bllService);
  }
}

export const serverService = new ServerService();
