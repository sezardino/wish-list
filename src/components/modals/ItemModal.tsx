import { useCreateItemMutation } from "@/hooks/react-query/mutation/create-item";
import { useSimpleListsQuery } from "@/hooks/react-query/query/simple-lists";
import { useTagsAndCategoriesQuery } from "@/hooks/react-query/query/tags-and-categories";
import { useTranslations } from "next-intl";
import { useCallback, type FC } from "react";
import { BaseModal, BaseModalProps } from "../base/BaseModal";
import { LoadingOverlay } from "../base/LoadingOverlay";
import { ItemForm, ItemFormValues } from "../forms/ItemForm";

export type ItemModalProps = Omit<
  BaseModalProps,
  "children" | "title" | "description" | "size"
> & {};

export const ItemModal: FC<ItemModalProps> = (props) => {
  const { onClose, ...rest } = props;
  const t = useTranslations("modals.list-create");

  const {
    data: tagsAndCategoriesData,
    isFetching: isTagsAndCategoriesLoading,
  } = useTagsAndCategoriesQuery({
    categories: { type: "ITEM" },
    tags: { type: "ITEM" },
    enabled: props.isOpen || false,
  });

  const { data: listsData, isFetching: isListsLoading } = useSimpleListsQuery(
    props.isOpen || false
  );

  const { mutateAsync: createItem, isPending: isCreateItemPending } =
    useCreateItemMutation();

  const isLoading = isTagsAndCategoriesLoading || isListsLoading;

  const createItemHandler = useCallback(
    async (values: ItemFormValues) => {
      try {
        await createItem({
          ...values,
          category: values.category?.[0],
        });

        onClose();
      } catch (error) {
        console.log(error);
      }
    },
    [createItem, onClose]
  );

  return (
    <BaseModal
      {...rest}
      onClose={onClose}
      size="2xl"
      title={t("title")}
      description={t("description")}
      className="py-4 relative"
    >
      {(isLoading || isCreateItemPending) && (
        <LoadingOverlay
          isInWrapper
          skeletonSize={!isCreateItemPending ? "2xl" : undefined}
        />
      )}
      {!isLoading && (
        <ItemForm
          lists={listsData?.lists || []}
          tags={tagsAndCategoriesData?.tags || []}
          categories={tagsAndCategoriesData?.categories || []}
          onFormSubmit={createItemHandler}
        />
      )}
    </BaseModal>
  );
};
