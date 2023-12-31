"use client";

import { AuthFormValues } from "@/components/forms/AuthForm";
import { AuthTemplate } from "@/components/templates/AuthTemplate";
import { ProjectPageUrls } from "@/const/url";
import { reactToastify } from "@/libs/react-toastify";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const t = useTranslations("toasts");

  const loginHandler = async (values: AuthFormValues) => {
    let res = await signIn("credentials", {
      ...values,
      redirect: false,
    });

    if (res?.ok) {
      reactToastify({ type: "success", message: t("login.success") });
      router.replace(ProjectPageUrls.home);
      return;
    } else {
      reactToastify({ type: "error", message: t("login.error") });
    }

    return res;
  };

  return <AuthTemplate type="login" onFormSubmit={loginHandler} />;
};

export default LoginPage;
