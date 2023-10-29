"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { type ComponentPropsWithoutRef, type FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import z from "zod";
import { BaseButton } from "../base/BaseButton";
import { ControlledInput } from "../form-fields/ControlledInput";

export type AuthFormValues = {
  login: string;
  password: string;
  repeatPassword?: string;
};

export type AuthFormProps = ComponentPropsWithoutRef<"form"> & {
  type: "login" | "registration";
  label: string;
  triggerCopy: string;
  onFormSubmit: (data: AuthFormValues) => void;
  onLoginAvailableRequest?: (login: string) => Promise<boolean>;
};

export const AuthForm: FC<AuthFormProps> = (props) => {
  const {
    onLoginAvailableRequest,
    onFormSubmit,
    type,
    label,
    triggerCopy,
    className,
    ...rest
  } = props;
  const t = useTranslations("auth-form");

  const { handleSubmit, control, setError, formState } =
    useForm<AuthFormValues>({
      mode: "onTouched",
      resolver: zodResolver(
        z
          .object({
            login: z
              .string({ required_error: t("login.required") })
              .min(1, { message: t("login.required") }),
            password: z
              .string({ required_error: t("password.required") })
              .min(6, { message: t("password.min-length", { value: 6 }) }),
            repeatPassword:
              type === "registration"
                ? z
                    .string({ required_error: t("repeat-password.required") })
                    .min(1, { message: t("repeat-password.required") })
                : z.optional(z.string()),
          })
          .refine(
            (data) =>
              type === "registration"
                ? data.password === data.repeatPassword
                : true,
            {
              path: ["repeatPassword"],
              message: t("repeat-password.not-match"),
            }
          )
      ),
    });

  const validateLoginHandler = async (login: string) => {
    if (!onLoginAvailableRequest) return;

    const response = await onLoginAvailableRequest(login);

    if (response) return;

    setError("login", {
      message: t("login.used"),
    });
  };

  const onSubmit: SubmitHandler<AuthFormValues> = async (data) => {
    if (type === "registration") {
      await validateLoginHandler(data.login);

      if (formState.errors) return;
    }

    onFormSubmit(data);
  };

  return (
    <form
      {...rest}
      className={twMerge("grid grid-cols-1 gap-5", className)}
      onSubmit={handleSubmit(onSubmit)}
      aria-label={label}
    >
      <div className="grid grid-cols-1 gap-2">
        <ControlledInput
          name="login"
          control={control}
          label={t("login.label")}
          placeholder={t("login.placeholder")}
          onBlur={(evt) => validateLoginHandler(evt.currentTarget.value)}
        />

        <ControlledInput
          name="password"
          type="password"
          control={control}
          label={t("password.label")}
          placeholder={t("password.placeholder")}
        />
        {type === "registration" && (
          <ControlledInput
            type="password"
            name="repeatPassword"
            control={control}
            label={t("repeat-password.label")}
            placeholder={t("repeat-password.placeholder")}
          />
        )}
      </div>

      <BaseButton type="submit" variant="bordered">
        {triggerCopy}
      </BaseButton>
    </form>
  );
};
