import { PrismaService } from "@/libs/prisma";
import { passwordService } from "@/services/password";
import { AbstractService } from "@/services/server/helpers";
import { User } from "@prisma/client";
import { UsersService } from "../users/users.service";
import { LoginRequest, RegistrationRequest } from "./schema";

export class AuthService extends AbstractService {
  constructor(
    prismaService: PrismaService,
    private readonly usersService: UsersService
  ) {
    super(prismaService);
  }

  async registration(dto: RegistrationRequest): Promise<boolean> {
    const { login, password } = dto;

    const isLoginAvailable = await this.usersService.isLoginAvailable(login);

    if (!isLoginAvailable) throw new Error("Login is already taken");

    const hashedPassword = await passwordService.hash(password);

    const newUser = await this.usersService.createUser(login, hashedPassword);

    return !!newUser;
  }

  async login(dto: LoginRequest): Promise<Pick<User, "id" | "login">> {
    const { login, password } = dto;

    const user = await this.usersService.findByLogin(login);

    if (!user) throw new Error("Wrong credentials");

    const isPasswordValid = await passwordService.compare(
      password,
      user.password
    );

    if (!isPasswordValid) throw new Error("Wrong credentials");

    return { id: user.id, login: user.login };
  }
}
