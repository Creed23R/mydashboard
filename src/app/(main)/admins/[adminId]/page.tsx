'use client'
import { AdminsContext } from '@/app/context/AdminsContext';
import { useParams } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'
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
import { Select, SelectItem } from "@nextui-org/select";
import { Avatar } from '@nextui-org/avatar'
import { Card, CardBody, CardHeader } from '@nextui-org/card'

const AdminPage = () => {

    const params = useParams();
    const { admin, getAdmin } = useContext(AdminsContext)
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible)

    useEffect(() => {
        getAdmin(params.adminId.toString())
    }, [])

    return (
        <Card
            className=" bg-transparent"
            shadow="sm">
            <form action="">
                <CardBody className="gap-5">
                    <div className="w-[100%] flex">
                        <div className="flex flex-col gap-3 w-[70%]">
                            <Input
                                autoFocus
                                endContent={
                                    <UserIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                }
                                labelPlacement="outside"
                                label="Name"
                                placeholder="Enter you name"
                                type="text"
                                variant="bordered"
                            />

                            <Input
                                endContent={
                                    <UserIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                }
                                labelPlacement="outside"
                                label="Lastname"
                                placeholder="Enter you lastname"
                                type="text"
                                variant="bordered"
                            />
                        </div>
                        <div className="flex justify-end items-center w-[30%]">
                            <label htmlFor="upload" className="rounded-xl items-center bg-inherit cursor-pointer">
                                {/* <AdminIcon color='primary' />
                                            <span className="text-[#a1a1aa] text-sm">Upload file</span> 
                                            "https://i.pravatar.cc/150?u=a04258114e29026302d"*/}
                                <Avatar src={admin?.image!} radius="sm" isBordered className="w-28 h-28 text-large" />
                            </label>
                            {/* onChange={(e) => setImage(e.target.files[0])}  */}
                            <input id="upload" type="file" className="hidden"
                            // onChange={(e) => {
                            //     e.target.files && setImage(e.target.files[0]);
                            // }} 
                            />
                        </div>
                    </div>
                    <Input
                        //name="email"
                        endContent={
                            <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0"/>
                        }
                        labelPlacement="outside"
                        label="Email"
                        placeholder="Enter your email"
                        variant="bordered"
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
                                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                    ) : (
                                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                    )}
                                </button>
                            }
                            type={isVisible ? "text" : "password"}
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
                                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                    ) : (
                                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                    )}
                                </button>
                            }
                            type={isVisible ? "text" : "password"}

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
                            // onClick={() => path.back()}
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
}

export default AdminPage