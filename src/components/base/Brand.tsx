import BrandLogo from "@/assets/brand/logo-big.png";
import Image from "next/image";
import Link, { LinkProps } from "next/link";
import { ComponentPropsWithoutRef, type FC } from "react";
import { twMerge } from "tailwind-merge";
import { Typography } from "./Typography";

export type BrandProps = LinkProps &
  ComponentPropsWithoutRef<"a"> & {
    isTextHidden?: boolean;
  };

export const Brand: FC<BrandProps> = (props) => {
  const { isTextHidden, className, ...rest } = props;

  return (
    <Link
      {...rest}
      className={twMerge("flex items-center", className)}
      aria-label={isTextHidden ? "Wish List" : undefined}
    >
      <Image
        src={BrandLogo}
        className={twMerge(!isTextHidden && "mr-3", "h-6 sm:h-9 w-auto")}
        alt="Wish list logo"
      />
      {!isTextHidden && (
        <Typography
          tag="span"
          styling="lg"
          weight="bold"
          className="self-center whitespace-nowrap"
        >
          Wish List
        </Typography>
      )}
    </Link>
  );
};
