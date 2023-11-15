import { useCallback, type FC } from "react";

import { useCreateListMutation } from "@/hooks/react-query/mutation/create-list";
import { useTagsAndCategoriesQuery } from "@/hooks/react-query/query/tags-and-categories";
import { ListFormValues } from "../forms/ListForm";
import { ListModal, ListModalProps } from "../modals/ListModal";

type OmittedModalProps = Omit<
  ListModalProps,
  "isDataFetching" | "isLoading" | "categories" | "tags" | "onFormSubmit"
>;

export type ListModalWrapperProps = OmittedModalProps;

export const ListModalWrapper: FC<ListModalWrapperProps> = (props) => {
  const { onClose, isOpen } = props;

  const {
    data: tagsAndCategoriesData,
    isFetching: isTagsAndCategoriesLoading,
  } = useTagsAndCategoriesQuery({
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

  const isLoading = isTagsAndCategoriesLoading || isCreateListPending;

  return (
    <ListModal
      {...props}
      isDataFetching={isTagsAndCategoriesLoading}
      isLoading={isLoading}
      categories={tagsAndCategoriesData?.categories || []}
      tags={tagsAndCategoriesData?.tags || []}
      onFormSubmit={createListHandler}
    />
  );
};
