import { bllService } from "../bll";
import { AuthServerModule } from "./modules/auth";

class ServerService {
  auth: AuthServerModule;

  constructor() {
    this.auth = new AuthServerModule(bllService);
  }
}

export const serverService = new ServerService();
