import { useTranslations } from "next-intl";
import { type FC } from "react";
import { BaseModal, BaseModalProps } from "../base/BaseModal";
import { LoadingOverlay } from "../base/LoadingOverlay";
import { ListForm, ListFormProps } from "../forms/ListForm";

type OmittedModalProps = Omit<
  BaseModalProps,
  "children" | "title" | "description" | "size"
>;

type PickedListFormProps = Pick<
  ListFormProps,
  "tags" | "categories" | "onFormSubmit"
>;

type ComponentProps = {
  isLoading: boolean;
  isDataFetching: boolean;
};

export type ListModalProps = OmittedModalProps &
  PickedListFormProps &
  ComponentProps;

export const ListModal: FC<ListModalProps> = (props) => {
  const { tags, categories, isDataFetching, isLoading, onFormSubmit, ...rest } =
    props;
  const t = useTranslations("modals.list-create");

  return (
    <BaseModal
      {...rest}
      size="2xl"
      title={t("title")}
      description={t("description")}
      className="py-4"
    >
      {isLoading && (
        <LoadingOverlay skeletonSize={isDataFetching ? "2xl" : undefined} />
      )}
      {!isDataFetching && (
        <ListForm
          tags={tags}
          categories={categories}
          onFormSubmit={onFormSubmit}
        />
      )}
    </BaseModal>
  );
};
