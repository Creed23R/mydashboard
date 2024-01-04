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
import { useRouter } from "next/navigation";
import {
    AdminIcon,
    CalendarIcon,
    MonitorMobileIcon,
    AnalyticsIcon,
    BagIcon,
    DeleteDocumentIcon,
    MenuIcon
} from '@/components/Icons'

const DropdownPages = () => {

    const path = useRouter()
    const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";

    return (
        <Dropdown placement="bottom-end">
            <DropdownTrigger>
                <Button
                    isIconOnly
                    variant="bordered"
                >
                    <MenuIcon className={iconClasses} />
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
                        shortcut="⌘A"
                        description="Copy the file link"
                        startContent={<AnalyticsIcon className={iconClasses} />}
                        onClick={() => path.push('/analytics')}
                    >
                        Analytics
                    </DropdownItem>
                    <DropdownItem
                        key="edit"
                        shortcut="⌘C"
                        description="Allows you to edit the file"
                        startContent={<CalendarIcon className={iconClasses} />}
                        onClick={() => path.push('/calendar')}
                    >
                        Calendar
                    </DropdownItem>
                    <DropdownItem
                        key="register"
                        shortcut="⌘U"
                        description="Allows you to edit the file"
                        startContent={<AdminIcon className={iconClasses} />}
                        onClick={() => path.push('/admins')}
                    >
                        Admins
                    </DropdownItem>
                    <DropdownItem
                        key="food"
                        shortcut="⌘U"
                        description="Allows you to edit the file"
                        startContent={<BagIcon className={iconClasses} />}
                        onClick={() => path.push('/products')}
                    >
                        Products
                    </DropdownItem>
                </DropdownSection>
                <DropdownSection title="Danger zone">
                    <DropdownItem
                        key="delete"
                        className="text-danger"
                        color="danger"
                        shortcut="⌘Q"
                        description="Permanently delete the file"
                        startContent={<DeleteDocumentIcon className="text-3xl" />}
                    >
                        Delete file
                    </DropdownItem>
                </DropdownSection>
            </DropdownMenu>
        </Dropdown>
    )
}

export default DropdownPages