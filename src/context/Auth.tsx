"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { PropsWithChildren } from "react";

export type AuthProviderProps = PropsWithChildren<{ session: Session | null }>;

export const AuthProvider = (props: AuthProviderProps) => {
  const { session, children } = props;

  return <SessionProvider session={session}>{children}</SessionProvider>;
};
