import { AuthApiModule } from "./modules/auth";
import { CommonApiModule } from "./modules/common";
import { ItemApiModule } from "./modules/item";
import { ListApiModule } from "./modules/list";

class ApiService {
  auth: AuthApiModule;
  list: ListApiModule;
  item: ItemApiModule;
  common: CommonApiModule;

  constructor() {
    this.auth = new AuthApiModule();
    this.list = new ListApiModule();
    this.item = new ItemApiModule();
    this.common = new CommonApiModule();
  }
}

export const apiService = new ApiService();
