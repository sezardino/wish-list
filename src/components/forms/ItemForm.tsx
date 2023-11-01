"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { type ComponentPropsWithoutRef, type FC } from "react";
import { useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import z from "zod";
import { ControlledInput } from "../form-fields/ControlledInput";
import { ControlledListbox } from "../form-fields/ControlledListbox";
import { ControlledTextarea } from "../form-fields/ControlledTextarea";
import { StringListbox } from "../form-fields/StringListbox";

export type ItemFormValues = {
  name: string;
  category: string[];
  tags: string[];
  description: string;
  averagePrice: number;
  listId: string;
  links: { name: string; url: string }[];
};

export interface ItemFormProps extends ComponentPropsWithoutRef<"form"> {
  lists: { id: string; name: string }[];
  tags: string[];
  categories: string[];
  onFormSubmit: (values: ItemFormValues) => void;
}

export const ItemForm: FC<ItemFormProps> = (props) => {
  const { lists, onFormSubmit, tags, categories, className, ...rest } = props;
  const t = useTranslations("forms.item-create");

  const { control, watch, handleSubmit, formState } = useForm<ItemFormValues>({
    mode: "onTouched",
    defaultValues: {
      name: "",
      category: [],
      tags: [],
      description: "",
      averagePrice: 0,
      listId: "",
      links: [],
    },
    resolver: zodResolver(
      z.object({
        name: z
          .string({ required_error: t("name.required") })
          .min(1, { message: t("name.required") }),
        tags: z.array(z.string()).optional(),
        category: z.array(z.string()).optional(),
        averagePrice: z.coerce.number().positive().optional(),
        description: z.string().optional(),
        list: z.array(z.string().optional()),
      })
    ),
  });

  const onSubmit = (values: ItemFormValues) => onFormSubmit(values);

  return (
    <form
      {...rest}
      className={twMerge("grid grid-cols-1 gap-6", className)}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="grid md:grid-cols-2 gap-3">
        <ControlledInput
          name="name"
          control={control}
          label={t("name.label")}
          placeholder={t("name.placeholder")}
        />

        <ControlledInput
          name="averagePrice"
          type="number"
          control={control}
          label={t("average-price.label")}
          placeholder={t("average-price.placeholder")}
          description={t("average-price.description")}
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

      <div className="grid md:grid-cols-2 gap-3">
        <ControlledListbox
          control={control}
          name="listId"
          items={lists.map((l) => ({ id: l.id, label: l.name }))}
          label={t("list.label")}
          placeholder={t("list.placeholder")}
          description={t("list.description")}
          noFound={t("list.no-found")}
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
        <Button type="submit">{t("submit")}</Button>
      </div>
    </form>
  );
};
