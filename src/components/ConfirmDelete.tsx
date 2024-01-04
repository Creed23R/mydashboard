
import React, { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";
import { Button, Input } from '@nextui-org/react';
import { DeleteIcon, EyeFilledIcon, EyeSlashFilledIcon } from './Icons';
import { AdminsContext } from '@/app/context/AdminsContext';
import bcrypt from "bcryptjs";

const ConfirmDelete = ({ email }: { email: string }) => {

    console.log(email)
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    const { adminProfile, getAdminProfile } = useContext(AdminsContext)
    const [password, setPassword] = useState('')

    useEffect(() => {
        getAdminProfile(email);
    }, [])

    console.log(adminProfile)

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log('FUNCIONA');
        const fields = new FormData(e.target as HTMLFormElement);
        const password = fields.get("password") as string;


        if (bcrypt.compareSync(password, adminProfile?.password!)) {
            console.log('Contraseña correcta');
            console.log(password)
            console.log(adminProfile?.password)
        } else {
            console.log('Contraseña incorrecta');
            console.log(password)
            console.log(adminProfile?.password)
        }
    }

    return (
        <>
            <Button className="text-lg text-default-400 cursor-pointer active:opacity-50 hover:none" variant="light" isIconOnly onPress={onOpen}><DeleteIcon className="text-[#f31260]" /></Button>

            <Modal
                size="xl"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
            >

                <ModalContent>

                    {(onClose) => (
                        <form onSubmit={handleSubmit}>
                            <ModalHeader className="flex flex-col gap-1">Confirmar xdActualizacion de datos de Usuario</ModalHeader>
                            <ModalBody>
                                <p>Para actualizar tu información de usuario, por favor, ingresa tu contraseña actual:</p>

                                <Input
                                    name="password"
                                    label="Password"
                                    variant="bordered"
                                    placeholder="Enter your password"
                                    endContent={
                                        <button
                                            className="focus:outline-none"
                                            type="button"
                                            onClick={toggleVisibility}
                                        >
                                            {isVisible ? (
                                                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                            ) : (
                                                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                            )}
                                        </button>
                                    }
                                    type={isVisible ? "text" : "password"}

                                />
                                <p>Una vez que ingreses tu contraseña, podrás proceder con la actualización de tus datos. Asegúrate de que la contraseña sea precisa para garantizar la seguridad de tu cuenta.</p>
                                <ModalFooter>
                                    <Button
                                        color="danger"
                                        variant="light"
                                        onPress={onClose}
                                    >
                                        Close
                                    </Button>
                                    <Button
                                        type='submit'
                                        color="primary"
                                        onPress={onClose}
                                    // onClick={async () => await verifyPass()}
                                    >
                                        Action
                                    </Button>
                                </ModalFooter>

                            </ModalBody>
                        </form>
                        // <form onSubmit={handleSubmit}>
                        //     <ModalHeader className="flex flex-col gap-1">Confirmar xdActualizacion de datos de Usuario</ModalHeader>

                        //     <ModalBody>
                        //         <p>Para actualizar tu información de usuario, por favor, ingresa tu contraseña actual:</p>
                        //         <Input
                        //             name="password"
                        //             label="Password"
                        //             variant="bordered"
                        //             placeholder="Enter your password"
                        //             endContent={
                        //                 <button
                        //                     className="focus:outline-none"
                        //                     type="button"
                        //                     onClick={toggleVisibility}
                        //                 >
                        //                     {isVisible ? (
                        //                         <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        //                     ) : (
                        //                         <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        //                     )}
                        //                 </button>
                        //             }
                        //             type={isVisible ? "text" : "password"}


                        //         // onChange={(e) =>
                        //         //     setContentUser((prevContentUser) => ({
                        //         //         ...prevContentUser,
                        //         //         password: e.target.value,
                        //         //     }))
                        //         // }
                        //         />
                        //         <p>Una vez que ingreses tu contraseña, podrás proceder con la actualización de tus datos. Asegúrate de que la contraseña sea precisa para garantizar la seguridad de tu cuenta.</p>
                        //     </ModalBody>
                        //     <ModalFooter>
                        //         <Button
                        //             type='submit'
                        //             color="danger"
                        //             variant="light"
                        //             onPress={onClose}
                        //         >
                        //             Close
                        //         </Button>
                        //         <Button
                        //             color="primary"
                        //             onPress={onClose}
                        //         // onClick={async () => await verifyPass()}
                        //         >
                        //             Action
                        //         </Button>
                        //     </ModalFooter>
                        // </form>
                    )}

                </ModalContent>
            </Modal>
        </>
    )
}

export default ConfirmDelete