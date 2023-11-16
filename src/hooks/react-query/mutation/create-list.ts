import { reactToastify } from "@/libs/react-toastify";
import { apiService } from "@/services/api";
import { CreateListRequest } from "@/services/server/modules/lists/schema";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

export const useCreateListMutation = () => {
  const t = useTranslations("toasts");

  return useMutation({
    mutationFn: (dto: CreateListRequest) => apiService.lists.create(dto),
    onSuccess: () => {
      // invalidate query for search lists
      reactToastify({ type: "success", message: t("list-create.success") });
    },
    onError: () =>
      reactToastify({ type: "error", message: t("list-create.error") }),
  });
};
