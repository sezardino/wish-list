import { Icon, IconNames } from "@/components/base/Icon";
import { type ComponentPropsWithoutRef, type FC } from "react";
import { twMerge } from "tailwind-merge";

export type HomeFeature = {
  title: string;
  description: string;
  icon: IconNames;
};

export type HomeFeaturesProps = ComponentPropsWithoutRef<"section"> & {
  features: HomeFeature[];
};

export const HomeFeatures: FC<HomeFeaturesProps> = (props) => {
  const { features, className, ...rest } = props;

  return (
    <section {...rest} className={twMerge("", className)}>
      <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <div className="max-w-screen-md mb-8 lg:mb-16">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 ">
            Designed for business teams like yours
          </h2>
          <p className="text-gray-500 sm:text-xl ">
            Here at Flowbite we focus on markets where technology, innovation,
            and capital can unlock long-term value and drive economic growth.
          </p>
        </div>
        <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
          {features.map((feature, index) => (
            <div key={index}>
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 ">
                <Icon name={feature.icon} />
              </div>
              <h3 className="mb-2 text-xl font-bold ">{feature.title}</h3>
              <p className="text-gray-500 ">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
