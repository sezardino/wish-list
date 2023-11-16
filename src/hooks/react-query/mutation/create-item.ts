import { reactToastify } from "@/libs/react-toastify";
import { apiService } from "@/services/api";
import { CreateItemRequest } from "@/services/server/modules/item/schema";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

export const useCreateItemMutation = () => {
  const t = useTranslations("toasts");

  return useMutation({
    mutationFn: (dto: CreateItemRequest) => apiService.item.create(dto),
    onSuccess: () => {
      // invalidate query for search lists
      reactToastify({ type: "success", message: t("item-create.success") });
    },
    onError: () =>
      reactToastify({ type: "error", message: t("item-create.error") }),
  });
};
