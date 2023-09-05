'use client'
import React from 'react'
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownSection,
    DropdownItem
} from "@nextui-org/dropdown";
import { Button } from '@nextui-org/button';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MenuIcon } from '@/../public/MenuIcon.jsx'
import { MonitorMobileIcon } from "@/../public/MonitorMobileIcon.jsx";
import { CopyDocumentIcon } from "@/../public/CopyDocumentIcon.jsx";
import { EditDocumentIcon } from "@/../public/EditDocumentIcon.jsx";
import { DeleteDocumentIcon } from "@/../public/DeleteDocumentIcon.jsx";
const DropdownPages = () => {

    const path = useRouter()
    const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";

    return (
        <Dropdown backdrop="blur" showArrow>
            <DropdownTrigger>
                <Button
                    isIconOnly
                    variant="bordered"
                >
                    <MenuIcon />
                </Button>
            </DropdownTrigger>
            <DropdownMenu variant="faded" aria-label="Dropdown menu with description">
                <DropdownSection title="Actions" showDivider>
                    <DropdownItem
                        key="new"
                        shortcut="⌘D"
                        description="Go to the Dashboard"
                        startContent={<MonitorMobileIcon className={iconClasses} />}
                        onClick={() => path.push('/dashboard')}
                    >
                        Dashboard
                    </DropdownItem>
                    <DropdownItem
                        key="copy"
                        shortcut="⌘C"
                        description="Copy the file link"
                        startContent={<CopyDocumentIcon className={iconClasses} />}
                        onClick={() => path.push('/analytics')}
                    >
                        Analytics
                    </DropdownItem>
                    <DropdownItem
                        key="edit"
                        shortcut="⌘⇧E"
                        description="Allows you to edit the file"
                        startContent={<EditDocumentIcon className={iconClasses} />}
                        onClick={() => path.push('/calendar')}
                    >
                        Calendar
                    </DropdownItem>
                </DropdownSection>
                <DropdownSection title="Danger zone">
                    <DropdownItem
                        key="delete"
                        className="text-danger"
                        color="danger"
                        shortcut="⌘⇧D"
                        description="Permanently delete the file"
                        startContent={<DeleteDocumentIcon className="text-3xl"/>}
                    >
                        Delete file
                    </DropdownItem>
                </DropdownSection>
            </DropdownMenu>
        </Dropdown>
    )
}

export default DropdownPages