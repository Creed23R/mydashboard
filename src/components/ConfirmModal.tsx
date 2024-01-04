import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import React, { useContext } from 'react'
import {
  DeleteIcon,
  CheckIcon,
  DangerIcon
} from '@/components/Icons'
import { AdminsContext } from "@/app/context/AdminsContext";
import { toast } from "sonner";
import { CategoriesContext } from "@/app/context/CategoriesContext";
import { useSession, signIn, signOut } from "next-auth/react"
import ConfirmDelete from "./ConfirmDelete";

interface Types {
  admin: string,
  category: string,
}

const ConfirmModal = ({ type, name, email, id, password }: { type: keyof Types, name: string, email: string, id: number, password: string }) => {

  const { deleteAdmin } = useContext(AdminsContext);
  const { deleteCategory } = useContext(CategoriesContext)
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data: session } = useSession()

  const deleteUsers = async (id: string) => {
    var response;
    if (type === 'admin') {
      response = await deleteAdmin(id);
    } else {
      response = await deleteCategory(id);
    }

    if (response.status === 200) {
      if (session?.user?.email === email) {
        signOut();
      }
      toast.success('Usuario Eliminado correctamente', {
        description: 'Monday, January 3rd at 6:00pm',
        icon: <CheckIcon />,
      });
    } else {
      toast.error('Error', {
        description: 'Hubo un error, intenta de nuevo y si el problema persiste comunicate con Kevin el mejor',
        icon: <DangerIcon className="text-xl text-red-600 pointer-events-none flex-shrink-0" />,
      });
    }
  }

  

  return (
    <>
      <Button className="text-lg text-default-400 cursor-pointer active:opacity-50 hover:none" variant="light" isIconOnly onPress={onOpen}><DeleteIcon className="text-[#f31260]" /></Button>
      <Modal size="lg" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Confirmar Eliminación de
                {
                  type === 'admin' ? ' Administrador' : ' Categoría'
                }
              </ModalHeader>
              <ModalBody>
                <p>
                  ¿Estás seguro de que deseas eliminar
                  {
                    type === 'admin' ? ' este usuario' : ' esta categoría'
                  }?
                </p>
                <p>
                  {
                    type === 'admin' ?
                      <span className="font-bold">Nombre de Administrador: </span>
                      :
                      <span className="font-bold">Nombre de Categoría: </span>
                  }
                  {name.toUpperCase()}
                </p>
                <p>
                  {
                    type === 'admin' ?
                      <span className="font-bold">ID de Administrador: </span>
                      :
                      <span className="font-bold">ID de Categoría: </span>
                  }
                  {id}
                </p>
                <p>Esta acción es irreversible y eliminará permanentemente los datos asociados con
                  {
                    type === 'admin' ? ' este administrador' : ' esta categoría'
                  }.

                  Por favor, asegúrate de que realmente deseas proceder con esta eliminación.</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>

                {/* <ConfirmDelete /> */}
                <Button
                  color="primary"
                  onPress={onClose}
                  onClick={() => deleteUsers(id.toString())}
                >
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

export default ConfirmModal