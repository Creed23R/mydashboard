'use client'
import React, { use, useContext } from 'react'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, DropdownSection } from "@nextui-org/dropdown";
import { Avatar } from '@nextui-org/avatar';
import { User } from "@nextui-org/user";
import {
    AddNoteIcon,
    LogoutIcon,
    SettingsIcon,
    MessagesIcon
} from "@/components/Icons";
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

const DropdpwnUser = () => {

    const { data: session, status } = useSession()
    const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";
    const path = useRouter()

    return (
        <Dropdown placement="bottom-end">
            <DropdownTrigger>
                {
                    session?.user?.image && <Avatar
                        isBordered
                        as="button"
                        className="transition-transform"
                        color="default"
                        name='kevin'
                        size="sm"
                        src={session?.user?.image}
                    />
                }
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="faded">
                <DropdownSection showDivider>
                    <DropdownItem key="profile" className="h-14 gap-2">
                        <User
                            name={session?.user?.name}
                            description={session?.user?.email}
                            avatarProps={{
                                src: `${session?.user?.image}`
                            }}
                        />
                    </DropdownItem>
                </DropdownSection>
                <DropdownSection showDivider>
                    <DropdownItem startContent={<SettingsIcon className={iconClasses} />} key="settings">My Settings</DropdownItem>
                    <DropdownItem startContent={<AddNoteIcon className={iconClasses} />} key="configurations">Configurations</DropdownItem>
                    <DropdownItem startContent={<MessagesIcon className={iconClasses} />} key="help_and_feedback">Help & Feedback</DropdownItem>
                </DropdownSection>
                <DropdownSection >
                    <DropdownItem
                        onClick={() => {
                            signOut({ redirect: false })
                            path.push('/')
                        }}
                        startContent={<LogoutIcon className={iconClasses} />}
                        key="logout"
                        color="danger">
                        Log Out
                    </DropdownItem>
                </DropdownSection>
            </DropdownMenu>
        </Dropdown>
    )
}

export default DropdpwnUser