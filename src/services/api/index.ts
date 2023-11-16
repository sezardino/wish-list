import { AuthApiModule } from "./modules/auth";
import { CategoriesApiModule } from "./modules/categories";
import { ItemsApiModule } from "./modules/items";
import { ListsApiModule } from "./modules/lists";
import { TagsApiModule } from "./modules/tags";

class ApiService {
  auth: AuthApiModule;
  lists: ListsApiModule;
  items: ItemsApiModule;
  tags: TagsApiModule;
  categories: CategoriesApiModule;

  constructor() {
    this.auth = new AuthApiModule();
    this.lists = new ListsApiModule();
    this.items = new ItemsApiModule();
    this.tags = new TagsApiModule();
    this.categories = new CategoriesApiModule();
  }
}

export const apiService = new ApiService();
