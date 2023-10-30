"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { type ComponentPropsWithoutRef, type FC } from "react";
import { useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import z from "zod";
import { BaseListBoxItem } from "../base/BaseListbox";
import { ControlledInput } from "../form-fields/ControlledInput";
import { ControlledTextarea } from "../form-fields/ControlledTextarea";
import { StringListbox } from "../form-fields/StringListbox";

export type ListFormValues = {
  name: string;
  category: string[];
  tags: string[];
  description: string;
  icon: string;
};
export const animals: BaseListBoxItem[] = [];
export interface ListFormProps extends ComponentPropsWithoutRef<"form"> {
  tags: string[];
  categories: string[];
}

export const ListForm: FC<ListFormProps> = (props) => {
  const { tags, categories, className, ...rest } = props;
  const t = useTranslations("forms.list-create");

  const { control, watch } = useForm<ListFormValues>({
    resolver: zodResolver(
      z.object({
        name: z
          .string({ required_error: t("name.required") })
          .min(1, { message: t("name.required") }),
        tags: z.array(z.string()),
        category: z.array(z.string()),
        description: z.string({ required_error: t("description.required") }),
        icon: z.string({ required_error: t("icon.required") }),
      })
    ),
  });

  return (
    <form {...rest} className={twMerge("grid grid-cols-1 gap-2", className)}>
      <div className="grid md:grid-cols-2 gap-3">
        <ControlledInput
          name="name"
          control={control}
          label={t("name.label")}
          placeholder={t("name.placeholder")}
        />

        <ControlledInput
          name="icon"
          control={control}
          label={t("icon.label")}
          placeholder={t("icon.placeholder")}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        <StringListbox
          control={control}
          selected={watch("category")}
          name="category"
          isSingleValue
          createCopy="Create Category:"
          items={categories}
          label="Category"
          placeholder="Select, or create new category"
          selectedCopy="Selected category: "
          noFound="Category not found, type something to create new one"
        />
        <StringListbox
          control={control}
          selected={watch("tags")}
          name="tags"
          createCopy="Create tag:"
          items={tags}
          label="Tags"
          placeholder="Select, or create new tag"
          selectedCopy="Selected tags: "
          noFound="Tags not found, type something to create new one"
        />
      </div>

      <ControlledTextarea
        name="description"
        control={control}
        label={t("description.label")}
        placeholder={t("description.placeholder")}
      />

      <div className="mt-2 flex flex-wrap gap-3 justify-between items-center">
        <Button color="danger">{t("cancel")}</Button>
        <Button>{t("submit")}</Button>
      </div>
    </form>
  );
};
