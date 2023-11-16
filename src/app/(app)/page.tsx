"use client";

import { DashboardTemplate } from "@/components/templates/DashboardTemplate";
import { ProjectPageUrls } from "@/const/url";
import { useDashboardListsQuery } from "@/hooks/react-query/query/dashboard-lists";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const DashboardPage = () => {
  const session = useSession();
  const {} = useDashboardListsQuery({}, !!session.data?.user);

  if (!session) redirect(ProjectPageUrls.about);

  return <DashboardTemplate />;
};

export default DashboardPage;
