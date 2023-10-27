import { passwordService } from "@/services/password";
import { PrismaClient, User } from "@prisma/client";
import { AbstractBllModule } from "../../helpers";
import { UserBllModule } from "../user";
import { UserWithListAndWithoutPassword } from "../user/type";
import { LoginDto, RegistrationDto } from "./dto";

export class AuthBllModule extends AbstractBllModule {
  constructor(
    prisma: PrismaClient,
    private readonly userModule: UserBllModule
  ) {
    super(prisma);
  }

  async registration(
    dto: RegistrationDto
  ): Promise<UserWithListAndWithoutPassword> {
    const { login, password } = dto;
    console.log(dto);
    const isLoginAvailable = await this.userModule.isLoginAvailable(login);

    if (!isLoginAvailable) throw new Error("Login is already taken");

    const hashedPassword = await passwordService.hash(password);

    const newUser = await this.userModule.createUser(login, hashedPassword);

    return newUser;
  }

  async login(dto: LoginDto): Promise<Pick<User, "id" | "login">> {
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
