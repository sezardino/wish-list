"use client";

import { ProjectPageUrls } from "@/const/url";
import { useTranslations } from "next-intl";
import { type ComponentPropsWithoutRef, type FC } from "react";
import { BaseLink } from "../base/BaseLink";
import { Typography } from "../base/Typography";
import { AuthForm, AuthFormProps } from "../forms/AuthForm";

export type AuthTemplateType = "login" | "registration";

export type AuthTemplateProps = ComponentPropsWithoutRef<"section"> & {
  type: "login" | "registration";
  onFormSubmit: AuthFormProps["onFormSubmit"];
  onLoginAvailableRequest?: AuthFormProps["onLoginAvailableRequest"];
};

export const AuthTemplate: FC<AuthTemplateProps> = (props) => {
  const { onLoginAvailableRequest, onFormSubmit, type, ...rest } = props;
  const t = useTranslations("auth-template");

  return (
    <section {...rest} className="border-2 rounded-md p-4">
      <div className="text-center">
        <Typography tag="h1">{t(`${type}.title`)}</Typography>
        <Typography tag="p">{t(`${type}.description`)}</Typography>
      </div>
      <AuthForm
        label={t(`${type}.title`)}
        triggerCopy={t(`${type}.trigger`)}
        type={type}
        className="mt-5"
        onFormSubmit={onFormSubmit}
        onLoginAvailableRequest={onLoginAvailableRequest}
      />
      <BaseLink
        size="sm"
        to={
          type === "login"
            ? ProjectPageUrls.registration
            : ProjectPageUrls.login
        }
        className="mt-5 inline-block"
      >
        {t(`${type}.link`)}
      </BaseLink>
    </section>
  );
};
