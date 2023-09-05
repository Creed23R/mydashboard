'use client'

import React from 'react'
import DropdownPages from './DropdownPages'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from "@nextui-org/navbar";
import { Input } from "@nextui-org/input";
import { SearchIcon } from '@/../public/SearchIcon'
import DropdownUser from './DropdownUser';
import { ThemeSwitcher } from './ThemeSwitcher'

const NavbarLayout = () => {
    return (
        <Navbar>
            <NavbarBrand>
                <DropdownPages />
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <Input
                    classNames={{
                        base: "max-w-full sm:max-w-[15rem] h-10",
                        mainWrapper: "h-full",
                        input: "text-small",
                        inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                    }}
                    placeholder="Type to search..."
                    size="sm"
                    startContent={<SearchIcon />}
                    type="search"
                />
            </NavbarContent>
            <NavbarContent justify="end">
                <ThemeSwitcher />
                <DropdownUser />
                {/* <NavbarItem className="hidden lg:flex">
                    <Link href="#">Login</Link>
                </NavbarItem>
                <NavbarItem>
                    <Button as={Link} color="primary" href="#" variant="flat">
                        Sign Up
                    </Button>
                </NavbarItem> */}
            </NavbarContent>
        </Navbar>
    )
}

export default NavbarLayout