import { User } from "@prisma/client";
import { AbstractBllModule } from "../../helpers";
import { UserWithListAndWithoutPassword } from "./type";

export class UserBllModule extends AbstractBllModule {
  async isLoginAvailable(login: string): Promise<boolean> {
    const user = await this.prismaService.user.findUnique({
      where: { login },
    });

    return !Boolean(user);
  }

  async findByLogin(login: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { login },
      select: {
        id: true,
        login: true,
        password: true,
      },
    });

    if (!user) throw new Error("User not found");

    return user;
  }

  async createUser(
    login: string,
    password: string
  ): Promise<UserWithListAndWithoutPassword> {
    return await this.prismaService.user.create({
      data: { login, password },
      select: { id: true, login: true, lists: true },
    });
  }
}
