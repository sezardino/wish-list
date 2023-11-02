import { MutationArguments } from "@/libs/graphql";
import { reactToastify } from "@/libs/react-toastify";
import { apiService } from "@/services/api";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

export const useCreateListMutation = () => {
  const t = useTranslations("toasts");

  return useMutation({
    mutationFn: (dto: MutationArguments["createList"]) =>
      apiService.list.create(dto),
    onSuccess: () => {
      // invalidate query for search lists
      reactToastify({ type: "success", message: t("list-create.success") });
    },
    onError: () =>
      reactToastify({ type: "error", message: t("list-create.error") }),
  });
};
