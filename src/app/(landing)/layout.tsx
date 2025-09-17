import { LandingFooter } from "@/components/modules/layout/landing-footer";
import { LandingHeader } from "@/components/modules/layout/landing-header";
import { PropsWithChildren } from "react";

const LandingLayout = async ({ children }: PropsWithChildren) => {
  return (
    <>
      <LandingHeader />
      {children}
      <LandingFooter />
    </>
  );
};

export default LandingLayout;
