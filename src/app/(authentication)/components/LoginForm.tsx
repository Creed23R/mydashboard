'use client'
import React, { FormEvent, useContext, useEffect } from 'react'
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Input } from "@nextui-org/input";

import {
    MailIcon,
    EyeSlashFilledIcon,
    EyeFilledIcon,
    GithubIcon,
    DangerIcon,
    GoogleIcon,
    CheckIcon
} from "@/components/Icons";

import { Button } from '@nextui-org/button';
import { useState } from 'react';
import { Checkbox } from '@nextui-org/checkbox';
import { Link } from '@nextui-org/link';
import { Divider } from '@nextui-org/divider';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Toaster, toast } from 'sonner';
import { UserContext } from '@/app/context/UserContext';

const LoginForm = () => {

    const path = useRouter()
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    const { getUser } = useContext(UserContext);
    const [email, setEmail] = useState('')

    useEffect(() => {
        console.log(email)
        async function fetchUser() {
            const data = await getUser(email);
            console.log(data);
        }
        fetchUser();
    }, [email])
    //console.log(userLogin)
    const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const res = await signIn("credentials", {
            email: formData.get("email"),
            password: formData.get("password"),
            redirect: false,
        });

        if (res?.error) {
            toast.error('Error', {
                description: res.error,
                icon: <DangerIcon className="text-2xl text-[#f31260] pointer-events-none flex-shrink-0" />,
            });
            return null
        }

        if (res?.ok) {
            console.log('xd')
            setEmail(formData.get('email') as string)
            path.push("/dashboard")
        }

    }

    return (
        <>
            <Toaster />
            <Card
                isBlurred
                className="border-none bg-background/60 dark:bg-default-100/50 min-w-[450px] max-w-[610px]"
                shadow="sm">
                <CardHeader className='pl-6'>Login</CardHeader>
                <form action="" onSubmit={handleSubmitForm}>
                    <CardBody className='flex flex-col gap-2 pb-0 '>
                        <Input
                            type="text"
                            name='email'
                            endContent={
                                <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                            }
                            label="Email"
                            placeholder="Enter your email"
                            variant="bordered"
                        />
                        <Input
                            name='password'
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
                                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                    ) : (
                                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                    )}
                                </button>
                            }
                            type={isVisible ? "text" : "password"}
                            className='max-w-xl'
                        />
                        <div className="flex py-2 px-1 justify-between">
                            <Checkbox
                                classNames={{
                                    label: "text-small",
                                }}
                            >
                                Remember me
                            </Checkbox>
                            <Link color="primary" href="/logout" size="sm">
                                Forgot password?
                            </Link>
                        </div>
                    </CardBody>

                    <CardFooter className='flex flex-col gap-1  px-5'>
                        <div className='flex justify-end gap-4 w-[100%]'>
                            {/* <Button color="danger" variant="flat" >
                        Close
                    </Button> */}
                            <Button color="primary" type='submit'>
                                Sign in
                            </Button>
                        </div>
                        <div className='flex box-border w-[100%] justify-center items-center'>
                            <Divider className='w-[45%]' />
                            <p className='w-[10] mx-3'>or</p>
                            <Divider className='w-[45%]' />
                        </div>
                        <div className='flex justify-end w-[100%] gap-2'>
                            <button>
                                <GithubIcon className="text-3xl" />
                            </button>
                            <button>
                                <GoogleIcon className="text-2xl" />
                            </button>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </>

    )
}

export default LoginForm