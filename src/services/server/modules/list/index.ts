import { BllService } from "@/services/bll";
import { AbstractServerModule } from "../../helpers";

export class ListServerModule extends AbstractServerModule {
  constructor(private readonly bllService: BllService) {
    super();
  }
}
