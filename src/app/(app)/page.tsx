"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState } from "react";

import { DashboardTemplate } from "@/components/templates/DashboardTemplate";
import { ProjectPageUrls } from "@/const/url";
import { useDashboardListsQuery } from "@/hooks/react-query/query/dashboard-lists";

const DashboardPage = () => {
  const session = useSession();
  const [page, setPage] = useState(1);
  const { data: listsData, isFetching: isListsLoading } =
    useDashboardListsQuery({ page: page - 1 }, !!session.data?.user);

  if (!session) redirect(ProjectPageUrls.about);

  return <DashboardTemplate listsData={listsData} onPageChange={setPage} />;
};

export default DashboardPage;
