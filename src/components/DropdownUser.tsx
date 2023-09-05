import React from 'react'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, DropdownSection } from "@nextui-org/dropdown";
import { Avatar } from '@nextui-org/avatar';
import { User } from "@nextui-org/user";
import { AddNoteIcon } from "@/../public/AddNoteIcon.jsx";
import { LogoutIcon } from "@/../public/LogoutIcon.jsx";
import { useRouter } from 'next/navigation';

const DropdpwnUser = () => {
    const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";   
    const path = useRouter()
    return (
        <Dropdown backdrop="blur" showArrow>
            <DropdownTrigger>
                <Avatar
                    isBordered
                    as="button"
                    className="transition-transform"
                    color="secondary"
                    name="Jason Hughes"
                    size="sm"
                    src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                />

            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="faded">
                <DropdownSection showDivider>
                    <DropdownItem key="profile" className="h-14 gap-2">
                        <User
                            name="Jane Doe"
                            description="Product Designer"
                            avatarProps={{
                                src: "https://i.pravatar.cc/150?u=a04258114e29026702d"
                            }}
                        />
                    </DropdownItem>
                </DropdownSection>
                <DropdownSection showDivider>
                    <DropdownItem startContent={<AddNoteIcon className={iconClasses} />} key="settings">My Settings</DropdownItem>
                    <DropdownItem startContent={<AddNoteIcon className={iconClasses} />} key="configurations">Configurations</DropdownItem>
                    <DropdownItem startContent={<AddNoteIcon className={iconClasses} />} key="help_and_feedback">Help & Feedback</DropdownItem>
                </DropdownSection>
                <DropdownSection >
                    <DropdownItem
                        onClick={() => path.push('/login')}
                        startContent={<LogoutIcon />}
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