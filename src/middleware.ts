import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { ProjectPageUrls } from "./const/url";
import nextAuthMiddleware from "./libs/next-auth/middleware";

export default withAuth((req) => {
  const token = req.nextauth.token;
  const pathname = req.nextUrl.pathname;

  if (pathname === ProjectPageUrls.home && token === null) {
    return NextResponse.redirect(new URL(ProjectPageUrls.about, req.url));
  }
}, nextAuthMiddleware);
