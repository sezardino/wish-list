import { DashboardTemplate } from "@/components/templates/DashboardTemplate";
import { ProjectPageUrls } from "@/const/url";
import { getNextAuthSession } from "@/libs/next-auth";
import { redirect } from "next/navigation";

const HomePage = async () => {
  const session = getNextAuthSession();

  if (!session) redirect(ProjectPageUrls.about);

  return <DashboardTemplate />;
};

export default HomePage;
