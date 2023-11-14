import { BaseButton } from "@/components/base/BaseButton";
import { BaseChip } from "@/components/base/BaseChip";
import { Icon, IconNames } from "@/components/base/Icon";
import { Typography } from "@/components/base/Typography";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardProps,
  Divider,
} from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { type FC } from "react";
import { twMerge } from "tailwind-merge";

type ComponentProps = {
  name: string;
  icon: IconNames | null;
  itemsCount: number;
  category: string | null;
  tags: string[];
  description: string | null;
};

export type ListCardProps = CardProps & ComponentProps;

export const ListCard: FC<ListCardProps> = (props) => {
  const {
    description,
    category,
    tags,
    name,
    icon,
    itemsCount,
    className,
    ...rest
  } = props;
  const t = useTranslations("components.list-card");

  return (
    <Card {...rest} as="article" className={twMerge(className)}>
      <CardHeader className="grid grid-cols-1 gap-1 pb-1">
        <Typography tag="h3">
          {icon && <Icon name={icon} className="inline mr-1" />}
          {name}
        </Typography>

        {category && (
          <div>
            <Typography tag="p" styling="sm" className="inline">
              {t("category")}
            </Typography>
            <BaseChip color="secondary">{category}</BaseChip>
          </div>
        )}
        {tags.length > 0 && (
          <div>
            <Typography tag="p" styling="sm" className="inline">
              {t("tags")}
            </Typography>
            <ul className="inline-flex flex-wrap gap-1">
              {tags.map((tag, i) => (
                <li key={i}>
                  <BaseChip>{tag}</BaseChip>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardHeader>
      <CardBody className="grid grid-cols-1 gap-1 px-3 py-1">
        <Divider />
        <Typography
          tag="p"
          ellipsisLength={description?.length ? 16 : undefined}
          styling="sm"
          className="italic"
        >
          {description?.length ? description : t("no-description")}
        </Typography>
      </CardBody>
      <CardFooter className="flex justify-between items-center flex-wrap gap-3 pt-1">
        <Typography tag="p" styling="sm">
          {t("count", { value: itemsCount })}
        </Typography>
        <BaseButton rightIcon="HiArrowCircleRight" size="sm">
          {t("more")}
        </BaseButton>
      </CardFooter>
    </Card>
  );
};
