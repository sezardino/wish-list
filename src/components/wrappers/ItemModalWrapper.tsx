import { useCallback, type FC } from "react";

import { useCreateItemMutation } from "@/hooks/react-query/mutation/create-item";
import { useCategoriesListQuery } from "@/hooks/react-query/query/categories-list";
import { useSimpleListsQuery } from "@/hooks/react-query/query/simple-lists";
import { useTagsListQuery } from "@/hooks/react-query/query/tags-list";
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

  const { data: tagsData, isFetching: isTagsLoading } = useTagsListQuery({
    type: "ITEM",
    enabled: isOpen || false,
  });
  const { data: categoriesData, isFetching: isCategoriesLoading } =
    useCategoriesListQuery({
      type: "ITEM",
      enabled: isOpen || false,
    });

  const { data: listsData, isFetching: isListsLoading } = useSimpleListsQuery(
    isOpen || false
  );

  const { mutateAsync: createItem, isPending: isCreateItemPending } =
    useCreateItemMutation();

  const isLoading = isTagsLoading || isCategoriesLoading || isListsLoading;

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
      categories={categoriesData?.categories || []}
      tags={tagsData?.tags || []}
      lists={listsData?.lists || []}
      onFormSubmit={createItemHandler}
    />
  );
};
