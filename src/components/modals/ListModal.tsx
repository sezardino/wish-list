import { Dialog } from "@radix-ui/themes";
import { type FC } from "react";
import { ListForm } from "../forms/ListForm";

export interface ListModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ListModal: FC<ListModalProps> = (props) => {
  const { isOpen, onClose } = props;

  const closeHandler = (status: boolean) => (!status ? onClose() : undefined);
  console.log(isOpen);
  return (
    <Dialog.Root open={isOpen} onOpenChange={closeHandler}>
      <Dialog.Content>
        <Dialog.Title>Edit profile</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Make changes to your profile.
        </Dialog.Description>
        <ListForm />
      </Dialog.Content>
    </Dialog.Root>
  );
};
