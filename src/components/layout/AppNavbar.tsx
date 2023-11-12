"use client";

import { type ComponentPropsWithoutRef, type FC } from "react";

import { ProjectPageUrls } from "@/const/url";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
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

  return (
    <nav {...rest} className={twMerge("bg-gray-50 border-b", className)}>
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 relative flex h-16 items-center justify-end">
        <Dropdown>
          <DropdownTrigger>
            <button>
              <span className="sr-only">{t("user-menu")}</span>
              <Avatar
                src={avatarSrc}
                radius="full"
                name={login?.slice(0, 1).toUpperCase()}
                className="text-xl"
              />
            </button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Avatar menu">
            <DropdownItem as={Link} href={ProjectPageUrls.home}>
              {t("profile")}
            </DropdownItem>
            <DropdownItem onClick={() => signOut()}>{t("logout")}</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </nav>
  );
};
