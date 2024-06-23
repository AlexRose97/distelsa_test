
import { FC, useState } from 'react';
import { Tooltip } from "@nextui-org/react";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDisclosure, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react"
import { Typography } from "@mui/material";

interface DeleteActionProps {
    id: number | string; //mensaje al eliminar
    message: string; //mensaje al eliminar
    onDelete: (id: number | string) => Promise<void>; //mensaje al eliminar
}

export const DeleteAction: FC<DeleteActionProps> = ({ message, onDelete, id }) => {
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
    const [loading, setLoading] = useState<boolean>(false)

    const eliminarRegistro = async () => {
        try {
            setLoading(true);
            await onDelete(1000);
            onClose()
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            <Tooltip color="danger" content="Eliminar">
                <Button isIconOnly color="danger" aria-label="Like" onPress={onOpen}>
                    <DeleteForeverIcon />
                </Button>
            </Tooltip>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Eliminar</ModalHeader>
                            <ModalBody>
                                <Typography textAlign={"center"}>{message}</Typography>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Cancelar
                                </Button>
                                <Button color="primary" onPress={eliminarRegistro} isLoading={loading}>
                                    Aceptar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
