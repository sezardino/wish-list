import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalProps,
} from "@nextui-org/react";
import { ReactNode, type FC } from "react";
import { Typography } from "./Typography";

export type BaseModalProps = Omit<ModalProps, "backdrop"> & {
  title?: string;
  description?: string;
  onClose: () => void;
  footer?: ReactNode;
};

export const BaseModal: FC<BaseModalProps> = (props) => {
  const { title, description, isOpen, onClose, footer, children, ...rest } =
    props;

  return (
    <Modal {...rest} isOpen={isOpen} onClose={onClose} backdrop="blur">
      <ModalContent>
        {(title || description) && (
          <ModalHeader className="flex flex-col gap-1">
            {title && (
              <Typography tag="h2" size="lg" weight="bold">
                {title}
              </Typography>
            )}

            {description && <Typography tag="p">{description}</Typography>}
          </ModalHeader>
        )}
        <ModalBody>{children}</ModalBody>

        {footer && <ModalFooter>{footer}</ModalFooter>}
      </ModalContent>
    </Modal>
  );
};
