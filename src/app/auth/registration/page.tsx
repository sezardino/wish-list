"use client";

import { AuthFormValues } from "@/components/forms/AuthForm";
import { AuthTemplate } from "@/components/templates/AuthTemplate";
import { ProjectPageUrls } from "@/const/url";
import { useIsLoginAvailableMutation } from "@/hooks/react-query/mutation/is-login-available";
import { useRegistrationMutation } from "@/hooks/react-query/mutation/registration";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

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
