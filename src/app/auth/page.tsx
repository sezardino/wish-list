"use client";

import { AuthFormValues } from "@/components/forms/AuthForm";
import { AuthTemplate } from "@/components/templates/AuthTemplate";
import { ProjectPageUrls } from "@/const/url";
import { signIn } from "next-auth/react";

const LoginPage = () => {
  const loginHandler = async (values: AuthFormValues) => {
    let res = await signIn("credentials", {
      ...values,
      redirect: true,
      callbackUrl: ProjectPageUrls.dashboard,
    });

    if (res?.ok) {
      console.log("success");
      return;
    } else {
      console.log("Failed", res);
    }
    return res;
  };

  return <AuthTemplate type="login" onFormSubmit={loginHandler} />;
};

export default LoginPage;
