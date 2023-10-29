"use client";

import { ProjectPageUrls } from "@/const/url";
import { PropsWithChildren } from "react";

import { DashboardNavbar } from "@/components/layout/DashboardNavbar";
import {
  DashboardSidebar,
  DashboardSidebarItem,
} from "@/components/layout/DashboardSidebar";
import { useSession } from "next-auth/react";
import { twMerge } from "tailwind-merge";
import styles from "./layout.module.css";

const lists: DashboardSidebarItem[][] = [
  [
    {
      label: "Dashboard",
      icon: "HiOutlineHome",
      to: ProjectPageUrls.dashboard,
    },
  ],
];

const DashboardLayout = (props: PropsWithChildren) => {
  const { children } = props;
  const session = useSession();

  if (!session.data) return null;

  return (
    <div
      className={twMerge(styles.element, "min-h-screen antialiased bg-gray-50")}
    >
      <DashboardNavbar
        // TODO: add image to profile
        avatarSrc={undefined}
        login={session.data.user.login}
        className={styles.navbar}
      />

      <DashboardSidebar
        lists={lists}
        className={twMerge(
          styles.sidebar,
          "max-md:fixed max-md:top-0 max-md:left-0"
        )}
        brandHref={ProjectPageUrls.dashboard}
      />
      <main className={twMerge(styles.content, "p-4 h-auto")}>{children}</main>
    </div>
  );
};

export default DashboardLayout;
