import { serverService } from "@/services/server";
import { useMutation } from "@tanstack/react-query";

import { IsLoginAvailableRequest } from "@/services/server/modules/users/schema";

export const useIsLoginAvailableMutation = () => {
  return useMutation({
    mutationFn: (dto: IsLoginAvailableRequest) =>
      serverService.users.api.isLoginAvailable(dto),
  });
};
