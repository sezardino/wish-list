import { cn } from "@nextui-org/react";
import { CakeSlice } from "lucide-react";
import Link from "next/link";
import { Typography } from "../base/typography";

type BrandLogoSizes = "sm" | "xl";

type BrandLogoProps = {
  href?: string;
  isTextHidden?: boolean;
  className?: string;
  size?: BrandLogoSizes;
};

const iconSizes: Record<BrandLogoSizes, string> = {
  sm: "w-6 h-6 sm:h-9 sm:w-9",
  xl: "w-6 h-6 sm:h-16 sm:w-16",
};

export const BrandLogo = (props: BrandLogoProps) => {
  const { size = "sm", isTextHidden, className, href } = props;

  const classNameString = cn("flex items-center", className);

  const inner = (
    <>
      <CakeSlice className={cn("mr-3", iconSizes[size])} />
      <Typography
        level="span"
        className={cn("whitespace-nowrap", isTextHidden && "sr-only")}
      >
        Wish List
      </Typography>
    </>
  );

  if (!href) return <div className={classNameString}>{inner}</div>;

  return (
    <Link href={href} className={classNameString}>
      {inner}
    </Link>
  );
};
