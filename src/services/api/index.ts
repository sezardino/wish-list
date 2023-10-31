import { AuthApiModule } from "./modules/auth";
import { ListApiModule } from "./modules/list";

class ApiService {
  auth: AuthApiModule;
  list: ListApiModule;

  constructor() {
    this.auth = new AuthApiModule();
    this.list = new ListApiModule();
  }
}

export const apiService = new ApiService();
