import { type ComponentPropsWithoutRef, type FC } from "react";
import { twMerge } from "tailwind-merge";
import { HomeFeature, HomeFeatures } from "../modules/home/HomeFeatures";
import { HomeHero } from "../modules/home/HomeHero";

export type HomeTemplateProps = ComponentPropsWithoutRef<"section">;

export const HomeTemplate: FC<HomeTemplateProps> = (props) => {
  const { className, ...rest } = props;

  const features: HomeFeature[] = [
    {
      title: "Marketing",
      description:
        "Plan it, create it, launch it. Collaborate seamlessly with all the organization and hit your marketing goals every month with our marketing plan.",
      icon: "HiChartBar",
    },
    {
      title: "Marketing",
      description:
        "Plan it, create it, launch it. Collaborate seamlessly with all the organization and hit your marketing goals every month with our marketing plan.",
      icon: "HiChartBar",
    },
    {
      title: "Marketing",
      description:
        "Plan it, create it, launch it. Collaborate seamlessly with all the organization and hit your marketing goals every month with our marketing plan.",
      icon: "HiChartBar",
    },
    {
      title: "Marketing",
      description:
        "Plan it, create it, launch it. Collaborate seamlessly with all the organization and hit your marketing goals every month with our marketing plan.",
      icon: "HiChartBar",
    },
    {
      title: "Marketing",
      description:
        "Plan it, create it, launch it. Collaborate seamlessly with all the organization and hit your marketing goals every month with our marketing plan.",
      icon: "HiChartBar",
    },
    {
      title: "Marketing",
      description:
        "Plan it, create it, launch it. Collaborate seamlessly with all the organization and hit your marketing goals every month with our marketing plan.",
      icon: "HiChartBar",
    },
  ];

  return (
    <main {...rest} className={twMerge(className)}>
      <HomeHero />
      <HomeFeatures features={features} />
    </main>
  );
};
