import { AuthApiModule } from "./modules/auth";
import { CommonApiModule } from "./modules/common";
import { ListApiModule } from "./modules/list";

class ApiService {
  auth: AuthApiModule;
  list: ListApiModule;
  common: CommonApiModule;

  constructor() {
    this.auth = new AuthApiModule();
    this.list = new ListApiModule();
    this.common = new CommonApiModule();
  }
}

export const apiService = new ApiService();
