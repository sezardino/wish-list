import { withAuth } from "next-auth/middleware";

export const nextAuthMiddleware = withAuth(function middleware(req) {}, {
  callbacks: {
    authorized: ({ req, token }) => {
      // TODO: add logic here
      return true;
    },
  },
});
