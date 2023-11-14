import { type FC } from "react";

import { Chip, ChipProps } from "@nextui-org/react";
import { Typography, TypographyProps } from "./Typography";

type OmittedTypographyProps = Omit<TypographyProps, "styling" | "tag">;
type OmittedChipProps = Omit<ChipProps, "as">;

type ComponentProps = {
  textSize?: TypographyProps["styling"];
  as?: TypographyProps["tag"];
};

export type BaseChipProps = OmittedChipProps &
  OmittedTypographyProps &
  ComponentProps;

export const BaseChip: FC<BaseChipProps> = (props) => {
  const {
    textSize = "xs",
    size = "sm",
    as = "span",
    children,
    ...rest
  } = props;

  return (
    <Chip {...rest} as={Typography} tag={as} size={size} styling={textSize}>
      {children}
    </Chip>
  );
};
