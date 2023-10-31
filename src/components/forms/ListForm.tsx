"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { type ComponentPropsWithoutRef, type FC } from "react";
import { useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import z from "zod";
import { IconNames } from "../base/Icon";
import { ControlledIconsSelect } from "../form-fields/ControlledIconsSelect";
import { ControlledInput } from "../form-fields/ControlledInput";
import { ControlledTextarea } from "../form-fields/ControlledTextarea";
import { StringListbox } from "../form-fields/StringListbox";

export const animals = [
  {
    label: "Cat",
    value: "cat",
    description: "The second most popular pet in the world",
  },
  {
    label: "Dog",
    value: "dog",
    description: "The most popular pet in the world",
  },
  {
    label: "Elephant",
    value: "elephant",
    description: "The largest land animal",
  },
  { label: "Lion", value: "lion", description: "The king of the jungle" },
  { label: "Tiger", value: "tiger", description: "The largest cat species" },
  {
    label: "Giraffe",
    value: "giraffe",
    description: "The tallest land animal",
  },
  {
    label: "Dolphin",
    value: "dolphin",
    description: "A widely distributed and diverse group of aquatic mammals",
  },
  {
    label: "Penguin",
    value: "penguin",
    description: "A group of aquatic flightless birds",
  },
  {
    label: "Zebra",
    value: "zebra",
    description: "A several species of African equids",
  },
  {
    label: "Shark",
    value: "shark",
    description:
      "A group of elasmobranch fish characterized by a cartilaginous skeleton",
  },
  {
    label: "Whale",
    value: "whale",
    description: "Diverse group of fully aquatic placental marine mammals",
  },
  {
    label: "Otter",
    value: "otter",
    description: "A carnivorous mammal in the subfamily Lutrinae",
  },
  {
    label: "Crocodile",
    value: "crocodile",
    description: "A large semiaquatic reptile",
  },
];

export type ListFormValues = {
  name: string;
  category: string[];
  tags: string[];
  description: string;
  icon: IconNames;
};
export interface ListFormProps extends ComponentPropsWithoutRef<"form"> {
  tags: string[];
  categories: string[];
  onFormSubmit: (values: ListFormValues) => void;
}

export const ListForm: FC<ListFormProps> = (props) => {
  const { onFormSubmit, tags, categories, className, ...rest } = props;
  const t = useTranslations("forms.list-create");

  const { control, watch, handleSubmit, setValue } = useForm<ListFormValues>({
    resolver: zodResolver(
      z.object({
        name: z
          .string({ required_error: t("name.required") })
          .min(1, { message: t("name.required") }),
        tags: z.array(z.string()).optional(),
        category: z.array(z.string()).optional(),
        description: z
          .string({ required_error: t("description.required") })
          .optional(),
        icon: z.string({ required_error: t("icon.required") }).optional(),
      })
    ),
  });

  const onSubmit = (values: ListFormValues) => onFormSubmit(values);

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

        <ControlledIconsSelect
          control={control}
          name="icon"
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
        <Button type="submit">{t("submit")}</Button>
      </div>
    </form>
  );
};
