import { AbstractBllModule } from "../../helpers";
import { UserWithListAndWithoutPassword } from "./type";

export class UserBllModule extends AbstractBllModule {
  async isLoginAvailable(login: string): Promise<boolean> {
    const user = await this.prismaService.user.findUnique({
      where: { login },
    });

    return !Boolean(user);
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
