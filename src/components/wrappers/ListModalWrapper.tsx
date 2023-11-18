import { useCallback, type FC } from "react";

import { useCreateListMutation } from "@/hooks/react-query/mutation/create-list";
import { useCategoriesListQuery } from "@/hooks/react-query/query/categories-list";
import { useTagsListQuery } from "@/hooks/react-query/query/tags-list";
import { ListFormValues } from "../forms/ListForm";
import { ListModal, ListModalProps } from "../modals/ListModal";

type OmittedModalProps = Omit<
  ListModalProps,
  "isDataFetching" | "isLoading" | "categories" | "tags" | "onFormSubmit"
>;

export type ListModalWrapperProps = OmittedModalProps;

export const ListModalWrapper: FC<ListModalWrapperProps> = (props) => {
  const { onClose, isOpen } = props;

  const { data: tagsData, isFetching: isTagsLoading } = useTagsListQuery({
    type: "LIST",
    enabled: isOpen || false,
  });
  const { data: categoriesData, isFetching: isCategoriesLoading } =
    useCategoriesListQuery({
      type: "LIST",
      enabled: isOpen || false,
    });

  const { mutateAsync: createList, isPending: isCreateListPending } =
    useCreateListMutation();

  const createListHandler = useCallback(
    async (values: ListFormValues) => {
      try {
        await createList({
          ...values,
          category: values.category?.[0],
        });

        onClose();
      } catch (error) {
        console.log(error);
      }
    },
    [createList, onClose]
  );

  const isLoading = isTagsLoading || isCategoriesLoading || isCreateListPending;

  return (
    <ListModal
      {...props}
      isDataFetching={isTagsLoading || isCategoriesLoading}
      isLoading={isLoading}
      categories={categoriesData?.categories || []}
      tags={tagsData?.tags || []}
      onFormSubmit={createListHandler}
    />
  );
};
