"use client";

import { ProjectPageUrls } from "@/const/url";
import { PropsWithChildren, useMemo } from "react";

import { AddEntityWidget } from "@/components/layout/AddEntityWidget";
import { AppNavbar } from "@/components/layout/AppNavbar";
import { AppSidebar, AppSidebarItem } from "@/components/layout/AppSidebar";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { twMerge } from "tailwind-merge";
import styles from "./layout.module.css";

const DashboardLayout = (props: PropsWithChildren) => {
  const { children } = props;
  const session = useSession();
  const t = useTranslations("layout.application.links");

  const lists = useMemo<AppSidebarItem[][]>(
    () => [
      [
        {
          label: t("dashboard"),
          icon: "HiOutlineHome",
          to: ProjectPageUrls.home,
        },
      ],
    ],
    [t]
  );

  if (!session.data) return null;

  return (
    <div
      className={twMerge(styles.element, "min-h-screen antialiased bg-gray-50")}
    >
      <AppNavbar
        // TODO: add image to profile
        avatarSrc={undefined}
        login={session.data.user.email}
        className={styles.navbar}
      />

      <AppSidebar
        lists={lists}
        className={twMerge(
          styles.sidebar,
          "max-md:fixed max-md:top-0 max-md:left-0"
        )}
        brandHref={ProjectPageUrls.home}
      />
      <main className={twMerge(styles.content, "p-4 h-auto")}>{children}</main>
      <AddEntityWidget className="fixed bottom-7 right-7" />
    </div>
  );
};

export default DashboardLayout;
