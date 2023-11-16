import { BllService } from "@/services/bll";
import { AbstractServerModule } from "../../helpers";

export class ItemServerModule extends AbstractServerModule {
  constructor(private readonly bllService: BllService) {
    super();
  }
}
