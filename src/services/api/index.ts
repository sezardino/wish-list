import { AuthApiModule } from "./modules/auth";

class ApiService {
  auth: AuthApiModule;

  constructor() {
    this.auth = new AuthApiModule();
  }
}

export const apiService = new ApiService();
