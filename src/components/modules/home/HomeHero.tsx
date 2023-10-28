import HeroIllustration from "@/assets/illustrations/hero.png";
import { Icon } from "@/components/base/Icon";
import { ProjectPageUrls } from "@/const/url";
import { Button, Heading, Text } from "@radix-ui/themes";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
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
        <Heading
          as="h1"
          size={{ initial: "8", sm: "9" }}
          weight={"bold"}
          className="max-w-2xl mb-4tracking-tight"
        >
          {t("title")}
        </Heading>

        <Text
          as="p"
          size={{ md: "3", lg: "4" }}
          className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8"
        >
          {t("description")}
        </Text>
        <Button size={"3"} asChild>
          <Link href={ProjectPageUrls.login}>
            <Text as="span">{t("login")}</Text>
            <Icon name="HiArrowRight" size={20} />
          </Link>
        </Button>
      </div>
      <Image
        src={HeroIllustration}
        alt={t("illustration")}
        className="hidden lg:mt-0 lg:col-span-5 lg:flex"
      />
    </section>
  );
};
