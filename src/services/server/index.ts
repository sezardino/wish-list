import { bllService } from "../bll";
import { CommonServerModule } from "./modules";
import { AuthServerModule } from "./modules/auth";

export * from "./modules";
export * from "./types";

class ServerService {
  auth: AuthServerModule;
  common: CommonServerModule;

  constructor() {
    this.auth = new AuthServerModule(bllService);
    this.common = new CommonServerModule(bllService);
  }
}

export const serverService = new ServerService();
