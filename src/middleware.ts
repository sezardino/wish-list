import { withAuth } from "next-auth/middleware";
import { ProjectPageUrls } from "./const/url";

const protectedRoutes = [ProjectPageUrls.dashboard, ProjectPageUrls.logout];

export default withAuth((req) => {}, {
  callbacks: {
    authorized: ({ req, token }) => {
      const currentPathName = req.nextUrl.pathname;

      const isProtectedRoute = protectedRoutes.some((route) =>
        currentPathName.startsWith(route)
      );

      if (isProtectedRoute && token === null) {
        return false;
      }

      return true;
    },
  },
});
