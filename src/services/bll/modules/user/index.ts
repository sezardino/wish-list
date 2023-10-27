import { AbstractBllModule } from "../../helpers";

export class UserBllModule extends AbstractBllModule {
  async isLoginAvailable(login: string): Promise<boolean> {
    const user = await this.prismaService.user.findUnique({
      where: { login },
    });

    return !Boolean(user);
  }
}
