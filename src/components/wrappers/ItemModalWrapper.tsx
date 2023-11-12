import { useCallback, type FC } from "react";

import { useCreateItemMutation } from "@/hooks/react-query/mutation/create-item";
import { useSimpleListsQuery } from "@/hooks/react-query/query/simple-lists";
import { useTagsAndCategoriesQuery } from "@/hooks/react-query/query/tags-and-categories";
import { ItemFormValues } from "../forms/ItemForm";
import { ItemModal, ItemModalProps } from "../modals/ItemModal";

type OmittedModalProps = Omit<
  ItemModalProps,
  | "canShowLoadingOverlay"
  | "isDataFetching"
  | "isItemCreating"
  | "isCreateItemPending"
  | "onFormSubmit"
  | "categories"
  | "tags"
  | "lists"
>;

export type ItemModalWrapperProps = OmittedModalProps;

export const ItemModalWrapper: FC<ItemModalWrapperProps> = (props) => {
  const { onClose, isOpen } = props;

  const {
    data: tagsAndCategoriesData,
    isFetching: isTagsAndCategoriesLoading,
  } = useTagsAndCategoriesQuery({
    categories: { type: "ITEM" },
    tags: { type: "ITEM" },
    enabled: isOpen || false,
  });

  const { data: listsData, isFetching: isListsLoading } = useSimpleListsQuery(
    isOpen || false
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
    <ItemModal
      {...props}
      canShowLoadingOverlay={isLoading || isCreateItemPending}
      isDataFetching={isLoading}
      isItemCreating={isCreateItemPending}
      categories={tagsAndCategoriesData?.categories || []}
      tags={tagsAndCategoriesData?.tags || []}
      lists={listsData?.lists || []}
      onFormSubmit={createItemHandler}
    />
  );
};
