import { ProjectPageUrls } from "@/const/url";
import { bllService } from "@/services/bll";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const nextAuthOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        login: { label: "Login", type: "login", placeholder: "login" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials || !credentials.login || !credentials.password)
          return null;

        const { login, password } = credentials;

        try {
          const user = await bllService.auth.login({ login, password });

          return user;
        } catch (error) {
          return null;
        }
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt", maxAge: 24 * 60 * 60 },

  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 60 * 60 * 24 * 30,
  },

  pages: {
    signIn: ProjectPageUrls.login,
    signOut: ProjectPageUrls.logout,
    error: ProjectPageUrls.login,
  },

  callbacks: {
    async session(params) {
      const { session, user } = params;

      if (user !== null) {
        session.user = user;
      }
      return session;
    },

    async jwt({ token }) {
      return token;
    },
  },
};
