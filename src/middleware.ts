import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
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
        NextResponse.redirect(ProjectPageUrls.dashboard);
        return false;
      }

      return true;
    },
  },
});
