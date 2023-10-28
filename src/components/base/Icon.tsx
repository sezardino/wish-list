import { FC, SVGProps } from "react";
import * as hiIcons from "react-icons/hi";

export type HiIconNames = keyof typeof hiIcons;
export type IconNames = HiIconNames;

export interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconNames;
  size?: number;
  className?: string;
}
export const Icon: FC<IconProps> = (props) => {
  const { rotate, name, size = 24, ...rest } = props;
  const Icon = { ...hiIcons }[name];

  return <Icon {...rest} size={size} />;
};
