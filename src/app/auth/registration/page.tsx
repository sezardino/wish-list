"use client";

import { AuthFormValues } from "@/components/forms/AuthForm";
import { AuthTemplate } from "@/components/templates/AuthTemplate";
import { ProjectPageUrls } from "@/const/url";
import { reactToastify } from "@/libs/react-toastify";
import { apiService } from "@/services/api";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

const RegistrationPage = () => {
  const router = useRouter();
  const t = useTranslations("toasts");

  const registrationHandler = useCallback(
    async (values: AuthFormValues) => {
      try {
        const response = await apiService.auth.registration(values);

        if (!response.registration) return;

        router.replace(ProjectPageUrls.login);
        reactToastify({ type: "success", message: t("registration.success") });
      } catch (error) {
        reactToastify({ type: "error", message: t("registration.error") });
      }
    },
    [router, t]
  );

  const checkIfLoginAvailable = async (login: string) => {
    const response = await apiService.auth.isLoginAvailable({ login });

    return response.isLoginAvailable;
  };

  return (
    <AuthTemplate
      type="registration"
      onFormSubmit={registrationHandler}
      onLoginAvailableRequest={checkIfLoginAvailable}
    />
  );
};

export default RegistrationPage;
