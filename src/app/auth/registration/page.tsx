"use client";

import { AuthFormValues } from "@/components/forms/AuthForm";
import { AuthTemplate } from "@/components/templates/AuthTemplate";
import { ProjectPageUrls } from "@/const/url";
import { apiService } from "@/services/api";
import { useRouter } from "next/navigation";

const RegistrationPage = () => {
  const router = useRouter();

  const registrationHandler = async (values: AuthFormValues) => {
    const response = await apiService.auth.registration(values);

    if (response.registration) {
      router.replace(ProjectPageUrls.login);
    }
  };

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
