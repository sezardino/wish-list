import { User } from "@prisma/client";
import { AbstractBllModule } from "../helpers";

export class UsersBllModule extends AbstractBllModule {
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
  ): Promise<Omit<User, "password">> {
    return await this.prismaService.user.create({
      data: { login, password },
      select: { id: true, login: true, lists: true },
    });
  }
}
