'use client'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";
import { Input } from "@nextui-org/input";
import {
    MailIcon,
    EyeSlashFilledIcon,
    EyeFilledIcon,
    CheckIcon,
    UserIcon,
    DangerIcon,
    BackIcon
} from "@/components/Icons";

import { Button } from "@nextui-org/button";
import { useContext, useState } from "react";
import { useForm } from 'react-hook-form'
import { AxiosError } from 'axios'
import { toast } from 'sonner';
import { useRouter } from "next/navigation";
import { AdminsContext } from "@/app/context/AdminsContext";
import { Select, SelectItem } from "@nextui-org/select";
import { Avatar } from '@nextui-org/avatar'
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { capitalize } from '@/components/Utils'

interface FormData {
    name: string
    lastname: string;
    email: string;
    password: string;
    confirmpassword: string;
    role: string;
    image: File,
}

const RegisterForm = () => {

    const path = useRouter()
    const [content, setContent] = useState<FormData>();
    const [image, setImage] = useState<File | null>(null);
    const { createAdmin } = useContext(AdminsContext)
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { register, handleSubmit, getValues,
        formState: { errors }, reset } = useForm<FormData>();
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleSubmitForm = handleSubmit(async (data) => {

        const nameCapitalize = capitalize(data.name);
        const lastnameCapitalize = capitalize(data.lastname);

        const newDate = new Date();

        const formattedDate = format(newDate, "EEEE, d 'de' MMMM 'a las' HH:mm", { locale: es });

        const formData = new FormData();
        formData.append('name', nameCapitalize);
        formData.append('lastname', lastnameCapitalize);
        formData.append('email', data.email);
        formData.append('password', data.password);
        formData.append('role', data.role);

        // image && formData.append('image', image)

        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await createAdmin(formData)
            if (response.status === 200) {
                toast.success('Event has been created', {
                    // description: 'Monday, January 3rd at 6:00pm',
                    description: formattedDate.toString(),
                    icon: <CheckIcon />,
                });
                reset();

                // setTimeout(() => {
                path.push('/admins')
                //     path.refresh();
                // }, 1000);
                // window.location.reload();
            } else {
                toast.error('Error', {
                    description: 'Hubo un error, intenta de nuevo y si el problema persiste comunicate con Kevin el mejor',
                    icon: <DangerIcon className="text-xl text-red-600 pointer-events-none flex-shrink-0" />,
                });
            }
            //     }
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error('Error', {
                    description: error.response?.data.message,
                    icon: <DangerIcon className="text-xl text-red-600 pointer-events-none flex-shrink-0" />,
                });
            }
        }

    })

    return (
        <Card
            className=" bg-transparent"
            shadow="sm">
            <form action="" onSubmit={handleSubmitForm}>
                <CardBody className="gap-5">
                    <div className="w-[100%] flex">
                        <div className="flex flex-col gap-3 w-[70%]">
                            <Input
                                autoFocus
                                endContent={
                                    <UserIcon className={(errors.name?.type === 'required' || errors.name?.type === 'minLength' || errors.name?.type === 'maxLength') ? "text-2xl text-[#f31260] pointer-events-none flex-shrink-0" : "text-2xl text-default-400 pointer-events-none flex-shrink-0"} />
                                }
                                labelPlacement="outside"
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
                            />

                            <Input
                                endContent={
                                    <UserIcon className={(errors.lastname?.type === 'required' || errors.lastname?.type === 'minLength' || errors.lastname?.type === 'maxLength') ? "text-2xl text-[#f31260] pointer-events-none flex-shrink-0" : "text-2xl text-default-400 pointer-events-none flex-shrink-0"} />
                                }
                                labelPlacement="outside"
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
                            />
                        </div>
                        <div className="flex justify-end items-center w-[30%]">
                            <label htmlFor="upload" className="rounded-xl items-center bg-inherit cursor-pointer">
                                {/* <AdminIcon color='primary' />
                                            <span className="text-[#a1a1aa] text-sm">Upload file</span> 
                                            "https://i.pravatar.cc/150?u=a04258114e29026302d"*/}
                                <Avatar src={image ? URL.createObjectURL(image) : "https://i.pravatar.cc/150?u=a042581f4e29026024d"} radius="sm" isBordered className="w-28 h-28 text-large" />
                            </label>
                            {/* onChange={(e) => setImage(e.target.files[0])}  */}
                            <input id="upload" type="file" className="hidden"
                                onChange={(e) => {
                                    e.target.files && setImage(e.target.files[0]);
                                }} />
                        </div>
                    </div>
                    <Input
                        //name="email"
                        endContent={
                            <MailIcon className={errors.email ? "text-2xl text-[#f31260] pointer-events-none flex-shrink-0" : "text-2xl text-default-400 pointer-events-none flex-shrink-0"} />
                        }
                        labelPlacement="outside"
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
                    />
                    <div className="flex gap-3">
                        <Input
                            labelPlacement="outside"
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
                        />
                        <Input
                            labelPlacement="outside"
                            label="Confirm Password"
                            variant="bordered"
                            placeholder="Confirm your password"
                            endContent={
                                <button
                                    className="focus:outline-none"
                                    type="button"
                                    onClick={toggleVisibility}
                                >
                                    {isVisible ? (
                                        <EyeSlashFilledIcon className={errors.confirmpassword ? "text-2xl text-[#f31260] pointer-events-none flex-shrink-0" : "text-2xl text-default-400 pointer-events-none flex-shrink-0"} />
                                    ) : (
                                        <EyeFilledIcon className={errors.confirmpassword ? "text-2xl text-[#f31260] pointer-events-none flex-shrink-0" : "text-2xl text-default-400 pointer-events-none flex-shrink-0"} />
                                    )}
                                </button>
                            }
                            type={isVisible ? "text" : "password"}
                            {...register('confirmpassword', {
                                required: true,
                                validate: (value) => value === getValues('password') || "Passwords don't match"
                            })}
                            validationState={errors.confirmpassword ? 'invalid' : 'valid'}
                            errorMessage={errors.confirmpassword && "Passwords don't match"}
                        />
                    </div>
                    <div className="flex gap-3">
                        <div className="w-[50%]">
                            <Select
                                labelPlacement="outside"
                                label="Range"
                                placeholder="Select your range"
                                className="max-w-xs"
                                variant="bordered"
                                {...register('role')}
                            >
                                <SelectItem key='USER' value='user'>
                                    USER
                                </SelectItem>
                                <SelectItem key='ADMIN' value='admin'>
                                    ADMIN
                                </SelectItem>
                            </Select>
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
                            <Button type="submit" color="primary">
                                Create Acount
                            </Button>
                        </div>
                    </div>
                </CardBody>
            </form>
        </Card>

    )
};

export default RegisterForm;
