import { AuthApiModule } from "./modules/auth";
import { CategoriesApiModule } from "./modules/categories";
import { ItemsApiModule } from "./modules/items";
import { ListsApiModule } from "./modules/lists";
import { TagsApiModule } from "./modules/tags";
import { UsersApiModule } from "./modules/users";

class ApiService {
  auth: AuthApiModule;
  lists: ListsApiModule;
  items: ItemsApiModule;
  tags: TagsApiModule;
  categories: CategoriesApiModule;
  users: UsersApiModule;

  constructor() {
    this.auth = new AuthApiModule();
    this.lists = new ListsApiModule();
    this.items = new ItemsApiModule();
    this.tags = new TagsApiModule();
    this.categories = new CategoriesApiModule();
    this.users = new UsersApiModule();
  }
}

export const apiService = new ApiService();
