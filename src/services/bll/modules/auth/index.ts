import { PrismaClient } from "@prisma/client";
import { AbstractBllModule } from "../../helpers";
import { UserBllModule } from "../user";

export class AuthBllModule extends AbstractBllModule {
  constructor(
    prisma: PrismaClient,
    private readonly userModule: UserBllModule
  ) {
    super(prisma);
  }

  async registration(): Promise<void> {
    return;
  }

  async login(): Promise<void> {
    return;
  }
}
