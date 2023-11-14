import { type ComponentPropsWithoutRef, type FC } from "react";

import { twMerge } from "tailwind-merge";

export type TypographySize =
  | "xs"
  | "sm"
  | "base"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl"
  | "7xl"
  | "8xl"
  | "9xl";

export type TypographyTag =
  | "p"
  | "span"
  | "legend"
  | "small"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6";

type TypographyWeight = "medium" | "regular" | "semi" | "bold";

export type TypographyProps = ComponentPropsWithoutRef<"p"> & {
  styling?: TypographySize;
  tag: TypographyTag;
  weight?: TypographyWeight;
  isUppercase?: boolean;
  isUnderlined?: boolean;
  isHidden?: boolean;
  isCentered?: boolean;
  ellipsisLength?: number;
};

export const ellipsisText = (text: string, limit: number) => {
  if (limit && text.length > limit) {
    return text.substring(0, limit).concat("...");
  }
  return text;
};

export const Typography: FC<TypographyProps> = (props) => {
  const {
    tag: Tag,
    children,
    styling: size = "base",
    weight = "regular",
    isCentered,
    isHidden,
    isUnderlined,
    isUppercase,
    ellipsisLength,
    className,
    ...rest
  } = props;

  const weightMap = {
    medium: "font-medium",
    regular: "font-normal",
    semi: "font-semibold",
    bold: "font-bold",
  };

  const sizeMap = {
    xs: "text-xs",
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
    "3xl": "text-3xl",
    "4xl": "text-4xl",
    "5xl": "text-5xl",
    "6xl": "text-6xl",
    "7xl": "text-7xl",
    "8xl": "text-8xl",
    "9xl": "text-9xl",
  };

  return (
    <Tag
      {...rest}
      className={twMerge(
        sizeMap[size],
        weightMap[weight],
        isCentered && "text-center",
        isHidden && "sr-only",
        isUnderlined && "underline",
        isUppercase && "uppercase",
        ellipsisLength && "line-clamp-1 overflow-hidden",
        className
      )}
      title={
        ellipsisLength && typeof children === "string" ? children : undefined
      }
    >
      {ellipsisLength && typeof children === "string"
        ? ellipsisText(children, ellipsisLength)
        : children}
    </Tag>
  );
};
