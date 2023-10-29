import { ProjectPageUrls } from "@/const/url";
import { getNextAuthSession } from "@/libs/next-auth";
import { redirect } from "next/navigation";

const HomePage = async () => {
  const session = getNextAuthSession();

  if (!session) redirect(ProjectPageUrls.about);

  return <h1>Dashboard</h1>;
};

export default HomePage;
