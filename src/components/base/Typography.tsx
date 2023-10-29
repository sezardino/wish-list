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
  size?: TypographySize;
  tag: TypographyTag;
  children?: string;
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
    children: text,
    size = "base",
    weight = "regular",
    isCentered,
    isHidden,
    isUnderlined,
    isUppercase,
    ellipsisLength,
    className,
    ...rest
  } = props;

  return (
    <Tag
      {...rest}
      className={twMerge(
        `text-${size} font-${weight} text-gray-900`,
        isCentered && "text-center",
        isHidden && "sr-only",
        isUnderlined && "underline",
        isUppercase && "uppercase",
        ellipsisLength && "line-clamp-1 overflow-hidden",
        className
      )}
      title={ellipsisLength && text ? text : undefined}
    >
      {ellipsisLength && text ? ellipsisText(text, ellipsisLength) : text}
    </Tag>
  );
};
