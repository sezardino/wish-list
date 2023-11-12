import { useTranslations } from "next-intl";
import { type FC } from "react";
import { BaseModal, BaseModalProps } from "../base/BaseModal";
import { LoadingOverlay } from "../base/LoadingOverlay";
import { ItemForm, ItemFormProps } from "../forms/ItemForm";

type OmittedModalProps = Omit<
  BaseModalProps,
  "children" | "title" | "description" | "size"
>;

type PickedItemFormProps = Pick<
  ItemFormProps,
  "lists" | "tags" | "categories" | "onFormSubmit"
>;

type ComponentProps = {
  canShowLoadingOverlay: boolean;
  isDataFetching: boolean;
  isItemCreating: boolean;
};

export type ItemModalProps = OmittedModalProps &
  PickedItemFormProps &
  ComponentProps;

export const ItemModal: FC<ItemModalProps> = (props) => {
  const {
    categories,
    lists,
    onFormSubmit,
    tags,
    isItemCreating,
    isDataFetching,
    canShowLoadingOverlay,
    onClose,
    ...rest
  } = props;
  const t = useTranslations("modals.list-create");

  return (
    <BaseModal
      {...rest}
      onClose={onClose}
      size="2xl"
      title={t("title")}
      description={t("description")}
      className="py-4 relative"
    >
      {canShowLoadingOverlay && (
        <LoadingOverlay
          isInWrapper
          skeletonSize={!isItemCreating ? "2xl" : undefined}
        />
      )}
      {!isDataFetching && (
        <ItemForm
          lists={lists}
          tags={tags}
          categories={categories}
          onFormSubmit={onFormSubmit}
        />
      )}
    </BaseModal>
  );
};
