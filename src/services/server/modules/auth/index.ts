import { PrismaService } from "@/libs/prisma";
import { AbstractModule } from "../../helpers";
import { UsersService } from "../users/users.service";
import { AuthApi } from "./auth.api";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

export class AuthModule
  implements AbstractModule<AuthController, AuthService, AuthApi>
{
  controller: AuthController;
  service: AuthService;
  api: AuthApi;

  constructor(
    private readonly prismaService: PrismaService,
    usersService: UsersService
  ) {
    this.service = new AuthService(prismaService, usersService);
    this.controller = new AuthController(this.service);
    this.api = new AuthApi();
  }
}
