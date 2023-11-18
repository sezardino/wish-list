// import { serverService } from "@/services/server";
import { useMutation } from "@tanstack/react-query";

import { apiService } from "@/services/api";
import { IsLoginAvailableRequest } from "@/services/server/modules/users/schema";

export const useIsLoginAvailableMutation = () => {
  return useMutation({
    mutationFn: (dto: IsLoginAvailableRequest) =>
      apiService.users.isLoginAvailable(dto),
  });
};
