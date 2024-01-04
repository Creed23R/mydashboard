import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import React from 'react'
const ConfirmUpdate = () => {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Button type="submit" color="warning"
                onPress={onOpen}
            >
                Update Acount
            </Button>
            <Modal size="lg" isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Confirmar Eliminación de Usuario</ModalHeader>
                            <ModalBody>
                                <p>
                                    ¿Estás seguro de que deseas eliminar este usuario?
                                </p>
                                {/* <p><span className="font-bold">Nombre de Usuario:</span> {user.name} {user.lastname}</p>
                                <p><span className="font-bold">ID de Usuario:</span> {user.id} </p> */}
                                <p>Esta acción es irreversible y eliminará permanentemente los datos asociados con este usuario. Por favor, asegúrate de que realmente deseas proceder con esta eliminación.</p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Action
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

export default ConfirmUpdate