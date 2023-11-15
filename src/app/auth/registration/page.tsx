"use client";

import { AuthFormValues } from "@/components/forms/AuthForm";
import { AuthTemplate } from "@/components/templates/AuthTemplate";
import { ProjectPageUrls } from "@/const/url";
import { reactToastify } from "@/libs/react-toastify";
import { apiService } from "@/services/api";
import {
  RegistrationRequest,
  IsLoginAvailableRequest,
} from "@/services/server";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

const useRegistrationMutation = () => {
  const t = useTranslations("toasts");

  return useMutation({
    mutationFn: (dto: RegistrationRequest) => apiService.auth.registration(dto),
    onSuccess: () =>
      reactToastify({ type: "success", message: t("registration.success") }),
    onError: () =>
      reactToastify({ type: "error", message: t("registration.error") }),
  });
};

const useIsLoginAvailableMutation = () => {
  return useMutation({
    mutationFn: (dto: IsLoginAvailableRequest) =>
      apiService.auth.isLoginAvailable(dto),
  });
};

const RegistrationPage = () => {
  const router = useRouter();
  const { mutateAsync: registration, isPending: isRegistrationPending } =
    useRegistrationMutation();
  const {
    mutateAsync: isLoginAvailableHandler,
    isPending: isLoginAvailablePending,
  } = useIsLoginAvailableMutation();

  const registrationHandler = useCallback(
    async (values: AuthFormValues) => {
      try {
        await registration(values);

        router.replace(ProjectPageUrls.login);
      } catch (error) {}
    },
    [router, registration]
  );

  const checkIfLoginAvailable = useCallback(
    async (login: string) => {
      const response = await isLoginAvailableHandler({ login });

      return response.available;
    },
    [isLoginAvailableHandler]
  );

  return (
    <AuthTemplate
      type="registration"
      onFormSubmit={registrationHandler}
      onLoginAvailableRequest={checkIfLoginAvailable}
    />
  );
};

export default RegistrationPage;
