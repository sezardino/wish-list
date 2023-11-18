import { reactToastify } from "@/libs/react-toastify";
import { serverService } from "@/services/server";
import { RegistrationRequest } from "@/services/server/modules/auth/schema";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

export const useRegistrationMutation = () => {
  const t = useTranslations("toasts");

  return useMutation({
    mutationFn: (dto: RegistrationRequest) =>
      serverService.auth.api.registration(dto),
    onSuccess: () =>
      reactToastify({ type: "success", message: t("registration.success") }),
    onError: () =>
      reactToastify({ type: "error", message: t("registration.error") }),
  });
};
