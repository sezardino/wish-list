"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Accordion, AccordionItem, Button } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { type ComponentPropsWithoutRef, type FC } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import z from "zod";
import { BaseButton } from "../base/BaseButton";
import { BaseGrid } from "../base/BaseGrid";
import { Typography } from "../base/Typography";
import { ControlledInput } from "../form-fields/ControlledInput";
import { ControlledSelect } from "../form-fields/ControlledSelect";
import { ControlledTextarea } from "../form-fields/ControlledTextarea";
import { StringListbox } from "../form-fields/StringListbox";

export type ItemFormValues = {
  name: string;
  category: string[];
  tags: string[];
  description: string;
  averagePrice: number;
  listId: string;
  links: { name: string; href: string }[];
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
        listId: z.string().min(1),
        links: z
          .array(
            z.object({
              name: z.string().min(1),
              href: z.string().url(),
            })
          )
          .optional(),
      })
    ),
  });

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: "links",
    }
  );

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
        <ControlledSelect
          control={control}
          name="listId"
          items={lists.map((list) => ({
            id: list.id,
            label: list.name,
          }))}
          label={t("list.label")}
          placeholder={t("list.placeholder")}
          description={t("list.description")}
        />
      </div>

      <ControlledTextarea
        name="description"
        control={control}
        label={t("description.label")}
        placeholder={t("description.placeholder")}
      />
      <BaseGrid gap={3}>
        <h2>Links</h2>
        {!!fields.length && (
          <Accordion as="ul" variant="bordered">
            {fields.map((field, index) => {
              const title = watch(`links.${index}.name`);
              const hasErrors =
                !!formState.errors.links?.[index] ||
                !!formState.errors.links?.[index];

              return (
                <AccordionItem
                  key={field.id}
                  as="li"
                  title={title ? title : "empty"}
                  subtitle={
                    hasErrors ? (
                      <Typography
                        styling="xs"
                        tag="span"
                        className="text-red-500"
                      >
                        has errors
                      </Typography>
                    ) : undefined
                  }
                >
                  <BaseGrid gap={2}>
                    <ControlledInput
                      label="Name"
                      placeholder="amazon"
                      control={control}
                      name={`links.${index}.name`}
                    />
                    <ControlledInput
                      label="Href"
                      placeholder="https://amazon.com"
                      control={control}
                      name={`links.${index}.href`}
                    />
                    <BaseButton
                      icon="HiTrash"
                      color="danger"
                      className="justify-self-center"
                      onClick={() => remove(index)}
                    />
                  </BaseGrid>
                </AccordionItem>
              );
            })}
          </Accordion>
        )}
        <div className="justify-self-center flex items-center flex-wrap gap-3">
          <BaseButton
            icon="HiPlusCircle"
            color="warning"
            onClick={() => append({ name: "", href: "" })}
          />
          {!!fields.length && (
            <BaseButton
              icon="HiTrash"
              color="danger"
              onClick={() => remove()}
            />
          )}
        </div>
      </BaseGrid>

      <div className="mt-2 flex flex-wrap gap-3 justify-between items-center">
        <Button color="danger">{t("cancel")}</Button>
        <Button type="submit">{t("submit")}</Button>
      </div>
    </form>
  );
};
