import BrandLogo from "@/assets/brand/logo-big.png";
import { Text } from "@radix-ui/themes";
import Image from "next/image";
import Link, { LinkProps } from "next/link";
import { type FC } from "react";

export type BrandProps = LinkProps;

export const Brand: FC<BrandProps> = (props) => {
  return (
    <Link {...props} className="flex items-center">
      <Image
        src={BrandLogo}
        className="mr-3 h-6 sm:h-9 w-auto"
        alt="Wish list logo"
      />
      <Text as="span" className="self-center whitespace-nowrap">
        Wish List
      </Text>
    </Link>
  );
};
