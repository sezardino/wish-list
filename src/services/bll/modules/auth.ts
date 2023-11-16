import { passwordService } from "@/services/password";
import { PrismaClient, User } from "@prisma/client";
import { UsersBllModule } from ".";
import { AbstractBllModule } from "../helpers";
import {
  RegistrationRequest,
  LoginRequest,
} from "@/services/server/modules/auth/schema";

export class AuthBllModule extends AbstractBllModule {
  constructor(
    prisma: PrismaClient,
    private readonly userModule: UsersBllModule
  ) {
    super(prisma);
  }

  async registration(dto: RegistrationRequest): Promise<boolean> {
    const { login, password } = dto;

    const isLoginAvailable = await this.userModule.isLoginAvailable(login);

    if (!isLoginAvailable) throw new Error("Login is already taken");

    const hashedPassword = await passwordService.hash(password);

    const newUser = await this.userModule.createUser(login, hashedPassword);

    return !!newUser;
  }

  async login(dto: LoginRequest): Promise<Pick<User, "id" | "login">> {
    const { login, password } = dto;

    const user = await this.userModule.findByLogin(login);

    if (!user) throw new Error("Wrong credentials");

    const isPasswordValid = await passwordService.compare(
      password,
      user.password
    );

    if (!isPasswordValid) throw new Error("Wrong credentials");

    return { id: user.id, login: user.login };
  }
}
