"use client";

import { ProjectPageUrls } from "@/const/url";
import { signOut, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import {
  Fragment,
  useId,
  useMemo,
  useState,
  type ComponentPropsWithoutRef,
  type FC,
} from "react";
import { twMerge } from "tailwind-merge";
import { BaseButton } from "../base/BaseButton";
import { Brand } from "../base/Brand";
import { Icon } from "../base/Icon";
import { Typography } from "../base/Typography";

type NavbarLink = {
  label: string;
  href?: ProjectPageUrls;
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
                <BaseButton
                  key={link.href}
                  to={link.href ? link.href : undefined}
                  variant="flat"
                  className="mx-1"
                  onClick={link.onClick}
                >
                  {link.label}
                </BaseButton>
              </Fragment>
            ))}

            {!!menuLinks.length && (
              <BaseButton
                variant="ghost"
                className="ml-2 lg:hidden"
                onClick={toggleMenu}
                data-collapse-toggle={menuID}
                aria-controls={menuID}
                aria-expanded={isMenuExpanded}
                aria-label={isMenuExpanded ? t("close-menu") : t("open-menu")}
              >
                <Icon name={isMenuExpanded ? "HiX" : "HiMenu"} />
              </BaseButton>
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
                    <BaseButton
                      variant="ghost"
                      to={link.href}
                      aria-current="page"
                    >
                      <Typography tag="span" className="text-black">
                        {link.label}
                      </Typography>
                    </BaseButton>
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
