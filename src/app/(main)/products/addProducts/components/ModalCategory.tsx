'use client'
import React, { useContext, useState } from 'react'
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure
} from '@nextui-org/modal'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { CheckIcon, DangerIcon, PlusIcon } from '@/components/Icons'
import { CategoriesContext } from '@/app/context/CategoriesContext'
import { Toaster, toast } from 'sonner'
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useRouter } from 'next/navigation'

const ModalCategory = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { createCategorie, categories } = useContext(CategoriesContext)
    const [newCategorie, setNewCategorie] = useState('')

    const newDate = new Date();
    const formattedDate = format(newDate, "EEEE, d 'de' MMMM 'a las' HH:mm", { locale: es });
    const path = useRouter()

    const handleButtonClick = async () => {
        try {
            const response = await createCategorie(newCategorie)
            if (response.status === 200) {
                toast.success('Event has been created', {
                    // description: 'Monday, January 3rd at 6:00pm',
                    description: formattedDate.toString(),
                    icon: <CheckIcon />,
                });
                path.refresh();
            } else {
                toast.error('Error', {
                    description: 'Hubo un error, intenta de nuevo',
                    icon: <DangerIcon className="text-xl text-red-600 pointer-events-none flex-shrink-0" />,
                });
            }
        } catch (error) {

        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewCategorie(e.target.value)
    }

    return (
        <>
            <Toaster />
            <Button
                size='sm'
                onPress={onOpen}
                className="bg-foreground text-background"
                startContent={<PlusIcon className="text-2xl" />}
            >
                Add New
            </Button>
            <Modal
                backdrop='blur'
                size='lg'
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="center"
                className='rounded-md gap-5'
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                <p className='text-bold'>Crear nueva categoria</p>
                                <span className='text-tiny text-gray-400'>Agregue una nueva categoria para los productos</span>
                            </ModalHeader>
                            <ModalBody>
                                <Input
                                    // endContent={
                                    //     <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                    // }
                                    onChange={handleInputChange}
                                    labelPlacement='outside'
                                    label="Categoria"
                                    placeholder="Ingrese nueva categoria"
                                    type="text"
                                    variant="bordered"
                                    radius='sm'
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Cancelar
                                </Button>
                                <Button
                                    color="primary"
                                    onPress={onClose}
                                    onClick={handleButtonClick}>
                                    Continuar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

export default ModalCategory