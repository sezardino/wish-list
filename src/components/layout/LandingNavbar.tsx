"use client";

import { ProjectPageUrls } from "@/const/url";
import { Button, Text } from "@radix-ui/themes";
import { signOut, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import {
  Fragment,
  useId,
  useMemo,
  useState,
  type ComponentPropsWithoutRef,
  type FC,
} from "react";
import { twMerge } from "tailwind-merge";
import { Brand } from "../base/Brand";
import { Icon } from "../base/Icon";

type NavbarLink = {
  label: string;
  href?: string;
  onClick?: () => void;
};

export interface LandingNavbarProps
  extends ComponentPropsWithoutRef<"header"> {}

export const LandingNavbar: FC<LandingNavbarProps> = (props) => {
  const { className, ...rest } = props;
  const t = useTranslations("layout.landing.navbar");
  const session = useSession();
  const menuID = useId();
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);

  const toggleMenu = () => setIsMenuExpanded((prev) => !prev);

  const authLinks = useMemo<NavbarLink[]>(() => {
    const notLoggedLinks = [
      { label: t("login"), href: ProjectPageUrls.login },
      { label: t("registration"), href: ProjectPageUrls.registration },
    ];

    const loggedLinks = [
      {
        label: t("logout"),
        onClick: () =>
          signOut({ callbackUrl: ProjectPageUrls.home, redirect: true }),
      },
    ];

    return session.data ? loggedLinks : notLoggedLinks;
  }, [session.data, t]);

  const menuLinks = useMemo<NavbarLink[]>(
    () =>
      session.data
        ? [{ label: t("dashboard"), href: ProjectPageUrls.home }]
        : [],
    [session.data, t]
  );

  return (
    <header
      {...rest}
      className={twMerge("bg-white border-gray-200 border-b", className)}
    >
      <nav className="px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Brand
            href={session.data ? ProjectPageUrls.home : ProjectPageUrls.home}
          />

          <div className="flex items-center lg:order-2">
            {authLinks.map((link) => (
              <Fragment key={link.href}>
                <Button
                  key={link.href}
                  asChild={!link.onClick}
                  radius="large"
                  variant="soft"
                  className="mx-1"
                  onClick={link.onClick}
                >
                  {link.href ? (
                    <Link href={link.href}>{link.label}</Link>
                  ) : (
                    link.label
                  )}
                </Button>
              </Fragment>
            ))}

            {!!menuLinks.length && (
              <Button
                type="button"
                variant="ghost"
                size="2"
                className="ml-2 lg:hidden"
                onClick={toggleMenu}
                data-collapse-toggle={menuID}
                aria-controls={menuID}
                aria-expanded={isMenuExpanded}
                aria-label={isMenuExpanded ? t("close-menu") : t("open-menu")}
              >
                <Icon name={isMenuExpanded ? "HiX" : "HiMenu"} />
              </Button>
            )}
          </div>
          {!!menuLinks.length && (
            <div
              className={twMerge(
                isMenuExpanded ? "flex" : "hidden",
                "justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
              )}
              id={menuID}
            >
              <ul className="flex flex-col gap-2 mt-4 lg:flex-row lg:space-x-8 lg:mt-0">
                {menuLinks.map((link) => (
                  <li key={link.href}>
                    <Button variant="ghost" asChild aria-current="page">
                      <Link href={link.href || "#"}>
                        <Text as="span" size="3" className="text-black">
                          {link.label}
                        </Text>
                      </Link>
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};
