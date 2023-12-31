"use client";

import { ReactQueryProvider } from "@/libs/react-query";
import { NextUIProvider } from "@nextui-org/react";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { NextIntlClientProvider } from "next-intl";
import { PropsWithChildren } from "react";
import { ToastContainer } from "react-toastify";
export type RootLayoutProvidersProps = PropsWithChildren<{
  session: Session | null;
  locale: string;
  messages: any;
}>;

export const RootLayoutProviders = ({
  children,
  session,
  locale,
  messages,
}: RootLayoutProvidersProps) => {
  return (
    <SessionProvider session={session}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <ReactQueryProvider>
          <NextUIProvider>
            {children}
            <ToastContainer />
          </NextUIProvider>
        </ReactQueryProvider>
      </NextIntlClientProvider>
    </SessionProvider>
  );
};
