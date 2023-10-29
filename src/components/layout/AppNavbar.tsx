"use client";

import {
  Fragment,
  useMemo,
  type ComponentPropsWithoutRef,
  type FC,
} from "react";

import { ProjectPageUrls } from "@/const/url";
import { Avatar, DropdownMenu } from "@radix-ui/themes";
import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

export type AppNavbarProps = ComponentPropsWithoutRef<"nav"> & {
  avatarSrc?: string;
  login: string;
};

export const AppNavbar: FC<AppNavbarProps> = (props) => {
  const { avatarSrc, login, className, ...rest } = props;
  const t = useTranslations("layout.application.navbar");

  const dropdownItems = useMemo<
    ({ label: string; to?: ProjectPageUrls; onClick?: () => void } | null)[]
  >(
    () => [
      { label: t("profile"), to: ProjectPageUrls.dashboard },
      null,
      { label: t("logout"), onClick: signOut },
    ],
    [t]
  );

  return (
    <nav {...rest} className={twMerge("bg-gray-50 border-b", className)}>
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 relative flex h-16 items-center justify-end">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <button>
              <span className="sr-only">{t("user-menu")}</span>
              <Avatar
                src={avatarSrc}
                radius="full"
                fallback={login.slice(0, 1).toUpperCase()}
              />
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            {dropdownItems.map((item, index) => (
              <Fragment key={index}>
                {item === null && <DropdownMenu.Separator />}

                {item !== null && (
                  <DropdownMenu.Item
                    key={index}
                    asChild={!!item.to}
                    onClick={item.onClick}
                  >
                    {item.to ? (
                      <Link href={item.to}>{item.label}</Link>
                    ) : (
                      item.label
                    )}
                  </DropdownMenu.Item>
                )}
              </Fragment>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>
    </nav>
  );
};
