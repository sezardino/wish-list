import { AuthApiModule } from "./modules/auth";
import { CategoriesApiModule } from "./modules/categories";
import { ItemApiModule } from "./modules/item";
import { ListApiModule } from "./modules/list";
import { TagsApiModule } from "./modules/tags";

class ApiService {
  auth: AuthApiModule;
  list: ListApiModule;
  item: ItemApiModule;
  tags: TagsApiModule;
  categories: CategoriesApiModule;

  constructor() {
    this.auth = new AuthApiModule();
    this.list = new ListApiModule();
    this.item = new ItemApiModule();
    this.tags = new TagsApiModule();
    this.categories = new CategoriesApiModule();
  }
}

export const apiService = new ApiService();
