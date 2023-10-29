import { ProjectPageUrls } from "@/const/url";
import { LinkProps, Link as NextUiLink } from "@nextui-org/react";
import NextLink from "next/link";
import { type FC } from "react";

export type BaseLinkProps = LinkProps & {
  to?: ProjectPageUrls;
  href?: string;
};

export const BaseLink: FC<BaseLinkProps> = (props) => {
  const { to, href, children, ...rest } = props;

  const as = to ? NextLink : href ? "a" : "button";
  const type = as === "button" ? "button" : undefined;

  return (
    <NextUiLink {...rest} as={as} type={type} href={to || href}>
      {children}
    </NextUiLink>
  );
};
