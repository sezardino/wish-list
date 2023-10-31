import HeroIllustration from "@/assets/illustrations/hero.png";
import { BaseButton } from "@/components/base/BaseButton";
import { Typography } from "@/components/base/Typography";
import { ProjectPageUrls } from "@/const/url";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { type ComponentPropsWithoutRef, type FC } from "react";
import { twMerge } from "tailwind-merge";

export type HomeHeroProps = ComponentPropsWithoutRef<"section"> & {};

export const HomeHero: FC<HomeHeroProps> = (props) => {
  const { className, ...rest } = props;
  const t = useTranslations("home.hero");

  return (
    <section
      {...rest}
      className={twMerge(
        "grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12",
        className
      )}
    >
      <div className="mr-auto place-self-center lg:col-span-7">
        <Typography
          tag="h1"
          styling="6xl"
          weight={"bold"}
          className="max-w-2xl mb-4tracking-tight"
        >
          {t("title")}
        </Typography>

        <Typography
          tag="p"
          styling="lg"
          className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8"
        >
          {t("description")}
        </Typography>
        <BaseButton to={ProjectPageUrls.login} rightIcon="HiArrowRight">
          <Typography tag="span">{t("login")}</Typography>
        </BaseButton>
      </div>
      <Image
        src={HeroIllustration}
        alt={t("illustration")}
        className="hidden lg:mt-0 lg:col-span-5 lg:flex"
      />
    </section>
  );
};
