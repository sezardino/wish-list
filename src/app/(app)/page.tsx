"use client";

import { ListFormValues } from "@/components/forms/ListForm";
import { DashboardTemplate } from "@/components/templates/DashboardTemplate";
import { ProjectPageUrls } from "@/const/url";
import { reactToastify } from "@/libs/react-toastify";
import { apiService } from "@/services/api";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

const HomePage = () => {
  const t = useTranslations("toasts");
  const session = useSession();
  const router = useRouter();

  const createListHandler = useCallback(
    async (values: ListFormValues) => {
      try {
        const response = await apiService.list.create({
          ...values,
          category: values.category?.[0],
        });

        if (!response.createList) return;
      } catch (error) {
        console.log(error);
        reactToastify({ type: "error", message: t("registration.error") });
      }
    },
    [t]
  );

  if (!session) router.replace(ProjectPageUrls.about);

  return <DashboardTemplate onCreateList={createListHandler} />;
};

export default HomePage;
