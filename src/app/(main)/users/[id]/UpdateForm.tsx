'use client'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";
import { Input } from "@nextui-org/input";
import { MailIcon,
    EyeSlashFilledIcon,
    EyeFilledIcon,
    UserIcon,
    CheckIcon,
    DangerIcon,
    BackIcon
 } from "@/components/Icons";

import { Button } from "@nextui-org/button";
import { useContext, useEffect, useState } from "react";
import { useForm } from 'react-hook-form'
import { AxiosError } from 'axios'
import { toast } from 'sonner';
import { UserContext } from "@/app/context/UserContext";
import { Select, SelectItem } from "@nextui-org/select";
import { Avatar } from '@nextui-org/avatar'
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { signIn, signOut, useSession } from "next-auth/react";
import ConfirmUpdate from "../../../../components/ConfirmUpdate";
import bcrypt from "bcryptjs";
import { Card, CardBody } from '@nextui-org/card'
import { useRouter } from "next/navigation";

const UpdateForm = ({ user }: { user: User }) => {

    // const [contentUser, setContentUser] = useState<User>(user);
    const [contentUser, setContentUser] = useState<User>({ ...user })

    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    useEffect(() => {
        setContentUser({
            id: user.id,
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            password: user.password,
            role: user.role,
            image: user.image,
        });
    }, [user]);

    const { register, handleSubmit, getValues,
        formState: { errors }, reset } = useForm<User>();
    const { updateUser } = useContext(UserContext)

    const ROLES = [
        { label: "ADMIN", value: "ADMIN" },
        { label: "USER", value: "USER" },
    ]

    const [image, setImage] = useState<File | null | Blob>(null);
    // console.log(image)
    // console.log(contentUser.image)

    async function fetchImageAsFile(imageUrl: string) {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const fileName = "avatar.jpg"; // El nombre del archivo que desees
        return new File([blob], fileName, { type: blob.type });
    }

    useEffect(() => {
        if (user.image) {
            fetchImageAsFile(user.image)
                .then((imageFile) => {
                    setImage(imageFile);
                })
                .catch((error) => {
                    // Manejar errores de descarga de imagen
                    console.error('Error al descargar la imagen:', error);
                });
        }
    }, [user.image]);

    const path = useRouter();

    const newDate = new Date();
    const formattedDate = format(newDate, "EEEE, d 'de' MMMM 'a las' HH:mm", { locale: es });

    const handleSubmitForm = handleSubmit((data) => {
        onOpen()
        setContentUser({
            ...contentUser,
            role: data.role
        });
    })

    const verifyPass = async () => {
        //console.log(user.password)
        const passwordMatch = await bcrypt.compare(contentUser.password!, user.password!);
        //console.log(passwordMatch)
        if (passwordMatch) {
            try {
                const formData = new FormData();
                formData.append('name', contentUser.name ? contentUser.name : '');
                //console.log(formData.get('name'))
                formData.append('lastname', contentUser.lastname ? contentUser.lastname : '');
                //console.log(formData.get('lastname'))
                formData.append('email', contentUser.email ? contentUser.email : '');
                //console.log(formData.get('email'))
                formData.append('role', contentUser.role ? contentUser.role : '');
                //console.log(formData.get('role'))
                if (image) {
                    formData.append('image', image);
                    //console.log(formData.get('image'))
                }
                // console.log(user.id)
                // console.log(formData.get('name'))
                // console.log(formData.get('lastname'))
                // console.log(formData.get('email'))
                // console.log(formData.get('role'))

                const response = await updateUser(user.id ? user.id : 0, formData)

                if (response.status === 200) {
                    toast.success('Event has been created', {
                        description: formattedDate.toString(),
                        icon: <CheckIcon />,
                    });
                    reset();

                    const res = await signIn("credentials", {
                        email: contentUser.email,
                        password: contentUser.password,
                        redirect: false
                    });

                    if (res?.error) {
                        toast.error('Error', {
                            description: res.error,
                            icon: <DangerIcon className="text-2xl text-[#f31260] pointer-events-none flex-shrink-0" />,
                        });
                        return null
                    }

                    if (res?.ok) {
                        path.push("/users")
                    }

                } else {
                    toast.error('Error', {
                        description: 'Hubo un error, intenta de nuevo y si el problema persiste comunicate con Kevin el mejor',
                        icon: <DangerIcon className="text-xl text-red-600 pointer-events-none flex-shrink-0" />,
                    });
                }
            } catch (error) {
                if (error instanceof AxiosError) {
                    toast.error('Error', {
                        description: error.response?.data.message,
                        icon: <DangerIcon className="text-xl text-red-600 pointer-events-none flex-shrink-0" />,
                    });
                }
            }
        } else {
            toast.error('Error', {
                description: 'Contraseña incorrecta',
                icon: <DangerIcon className="text-xl text-red-600 pointer-events-none flex-shrink-0" />,
            });
        }
    }

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Card
                isBlurred
                className="border-none bg-background/60 dark:bg-default-100/50"
                shadow="sm">
                <CardBody className="flex flex-col gap-5">
                    <form className="flex flex-col gap-5" onSubmit={handleSubmitForm}>
                        <div className="w-[100%] flex ">
                            <div className="flex flex-col gap-5 w-[70%]">
                                <Input
                                    autoFocus
                                    endContent={
                                        <UserIcon className={(errors.name?.type === 'required' || errors.name?.type === 'minLength' || errors.name?.type === 'maxLength') ? "text-2xl text-[#f31260] pointer-events-none flex-shrink-0" : "text-2xl text-default-400 pointer-events-none flex-shrink-0"} />
                                    }
                                    label="Name"
                                    placeholder="Enter you name"
                                    type="text"
                                    variant="bordered"
                                    {...register('name', {
                                        required: {
                                            value: true,
                                            message: "Name is required"
                                        },
                                        minLength: {
                                            value: 2,
                                            message: "Name must be at least 2 characters"
                                        }, maxLength: {
                                            value: 20,
                                            message: "The name must be less than 20 characters."
                                        }
                                    })}
                                    validationState={errors.name?.type === 'required' || errors.name?.type === 'minLength' || errors.name?.type === 'maxLength' ? 'invalid' : 'valid'}
                                    errorMessage={errors.name?.message}
                                    value={contentUser?.name ? contentUser?.name : ""}
                                    onChange={(e) =>
                                        setContentUser((prevContentUser) => ({
                                            ...prevContentUser,
                                            name: e.target.value,
                                        }))
                                    }
                                />

                                <Input
                                    endContent={
                                        <UserIcon className={(errors.lastname?.type === 'required' || errors.lastname?.type === 'minLength' || errors.lastname?.type === 'maxLength') ? "text-2xl text-[#f31260] pointer-events-none flex-shrink-0" : "text-2xl text-default-400 pointer-events-none flex-shrink-0"} />
                                    }
                                    label="Lastname"
                                    placeholder="Enter you lastname"
                                    type="text"
                                    variant="bordered"
                                    {...register('lastname', {
                                        required: {
                                            value: true,
                                            message: "Fullname is required"
                                        },
                                        minLength: {
                                            value: 2,
                                            message: "Name must be at least 2 characters"
                                        }, maxLength: {
                                            value: 20,
                                            message: "The name must be less than 20 characters."
                                        }
                                    })}
                                    validationState={errors.lastname?.type === 'required' || errors.lastname?.type === 'minLength' || errors.lastname?.type === 'maxLength' ? 'invalid' : 'valid'}
                                    errorMessage={errors.lastname?.message}
                                    value={contentUser?.lastname ? contentUser?.lastname : ''}
                                    onChange={(e) =>
                                        setContentUser((prevContentUser) => ({
                                            ...prevContentUser,
                                            lastname: e.target.value,
                                        }))
                                    }
                                />
                            </div>
                            <div className="flex justify-end items-center w-[30%]">
                                <label htmlFor="upload" className="rounded-xl items-center bg-inherit cursor-pointer">
                                    <Avatar src={image ? URL.createObjectURL(image) : contentUser.image} radius="sm" isBordered className="w-28 h-28 text-large" />
                                </label>
                                {/* onChange={(e) => setImage(e.target.files[0])}  */}
                                <input id="upload" type="file" className="hidden"
                                    onChange={(e) => {
                                        e.target.files && setImage(e.target.files[0]);
                                    }} />
                            </div>
                        </div>
                        <div className="">
                            <Input
                                endContent={
                                    <MailIcon className={errors.email ? "text-2xl text-[#f31260] pointer-events-none flex-shrink-0" : "text-2xl text-default-400 pointer-events-none flex-shrink-0"} />
                                }
                                label="Email"
                                placeholder="Enter your email"
                                variant="bordered"
                                {...register('email', {
                                    required: {
                                        value: true,
                                        message: "Email is required"
                                    },
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                        message: "Invalid email address"
                                    }
                                })}
                                validationState={errors.email ? 'invalid' : 'valid'}
                                errorMessage={errors.email?.message}
                                value={contentUser?.email ? contentUser?.email : ""}
                                onChange={(e) =>
                                    setContentUser((prevContentUser) => ({
                                        ...prevContentUser,
                                        email: e.target.value,
                                    }))
                                }
                            />
                        </div>

                        <div className="flex gap-3">
                            <div className="flex flex-col gap-3 w-[80%]">

                                <Select
                                    label="Range"
                                    placeholder="Select your range"
                                    className="max-w-xs"
                                    variant="bordered"
                                    {...register('role')}
                                    defaultSelectedKeys={contentUser.role ? [contentUser.role] : ['']}
                                >
                                    {ROLES.map((role) => (
                                        <SelectItem key={role.value} value={role.value}>
                                            {role.label}
                                        </SelectItem>
                                    ))}
                                </Select>

                                {/* <Select
                                    {...register('role')}
                                    label="Rol"
                                    placeholder="Selecciona tu rango"
                                    selectedKeys={[contentUser.role ? contentUser.role : '']}
                                    onChange={(e) => {
                                        setContentUser((prevContentUser) => ({
                                            ...prevContentUser,
                                            role: e.target.value,
                                        }))
                                    }}
                                    className="max-w-2xl"
                                >
                                    {ROLES.map((role) => (
                                        <SelectItem key={role.value} value={role.value}>
                                            {role.label}
                                        </SelectItem>
                                    ))}
                                </Select> */}

                            </div>


                            <div className="flex justify-end items-center w-[50%] gap-2">
                                <Button
                                    isIconOnly
                                    type="button"
                                    color="default"
                                    onClick={() => path.back()}
                                >
                                    <BackIcon className="text-xl text-white" />
                                </Button>

                                <Button type="submit" color="warning">Update Acount</Button>

                            </div>
                        </div>

                    </form>
                </CardBody>
            </Card>

            <Modal
                size="xl"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Confirmar Actualizacion de datos de Usuario</ModalHeader>
                            <ModalBody>
                                <p>Para actualizar tu información de usuario, por favor, ingresa tu contraseña actual:</p>

                                <Input
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
                                                <EyeSlashFilledIcon className={errors.password ? "text-2xl text-[#f31260] pointer-events-none flex-shrink-0" : "text-2xl text-default-400 pointer-events-none flex-shrink-0"} />
                                            ) : (
                                                <EyeFilledIcon className={errors.password ? "text-2xl text-[#f31260] pointer-events-none flex-shrink-0" : "text-2xl text-default-400 pointer-events-none flex-shrink-0"} />
                                            )}
                                        </button>
                                    }
                                    type={isVisible ? "text" : "password"}
                                    {...register('password', {
                                        required: {
                                            value: true,
                                            message: "Password is required"
                                        },
                                        pattern: {
                                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^*()_+|~?&-]).{8,128}$/,
                                            message: "Password must contain at least 8 characters, including uppercase, lowercase, number and special character"
                                        }
                                    })}
                                    validationState={errors.password ? 'invalid' : 'valid'}
                                    errorMessage={errors.password?.message}
                                    onChange={(e) =>
                                        setContentUser((prevContentUser) => ({
                                            ...prevContentUser,
                                            password: e.target.value,
                                        }))
                                    }
                                />
                                <p>Una vez que ingreses tu contraseña, podrás proceder con la actualización de tus datos. Asegúrate de que la contraseña sea precisa para garantizar la seguridad de tu cuenta.</p>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="danger"
                                    variant="light"
                                    onPress={onClose}
                                >
                                    Close
                                </Button>
                                <Button
                                    color="primary"
                                    onPress={onClose}
                                    onClick={async () => await verifyPass()}>
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

export default UpdateForm