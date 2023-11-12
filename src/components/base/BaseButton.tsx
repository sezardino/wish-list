import { ForwardRefRenderFunction, forwardRef } from "react";

import { ProjectPageUrls } from "@/const/url";
import { Button, ButtonProps } from "@nextui-org/react";
import Link from "next/link";
import { Icon, IconNames } from "./Icon";

export type BaseButtonProps = Omit<
  ButtonProps,
  "endContent" | "startContent" | "isIconOnly" | "radius"
> & {
  leftIcon?: IconNames;
  rightIcon?: IconNames;
  icon?: IconNames;
  href?: string;
  to?: ProjectPageUrls;
};

const BaseButtonComponent: ForwardRefRenderFunction<
  HTMLButtonElement,
  BaseButtonProps
> = (props, ref) => {
  const { href, to, leftIcon, rightIcon, icon, children, ...rest } = props;

  const as = to ? Link : href ? "a" : "button";

  return (
    <Button
      ref={ref}
      type={as === "button" ? "button" : undefined}
      {...rest}
      as={as}
      href={to || href}
      startContent={leftIcon ? <Icon name={leftIcon} /> : null}
      endContent={rightIcon ? <Icon name={rightIcon} /> : null}
      isIconOnly={!!icon}
      radius={icon ? "full" : "sm"}
    >
      {children}
      {icon && <Icon name={icon} />}
    </Button>
  );
};

export const BaseButton = forwardRef(BaseButtonComponent);
