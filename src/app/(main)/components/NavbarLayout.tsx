'use client'
import {
	Navbar as NextUINavbar,
	NavbarContent,
	NavbarMenu,
	NavbarMenuToggle,
	NavbarBrand,
	NavbarItem,
	NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Kbd } from "@nextui-org/kbd";
import { Input } from "@nextui-org/input";
import DropdownUser from './DropdownUser';
import { useSession } from 'next-auth/react';
import NextLink from "next/link";
import clsx from "clsx";

import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import {
	TwitterIcon,
	GithubIcon,
	DiscordIcon,
	HeartFilledIcon,
	SearchIcon,
} from "@/components/Icons";

import { Logo } from "@/components/Icons";
import { useRouter } from 'next/navigation';
import DropdownPages from './DropdownPages'
import { useContext, useEffect } from "react";
import { UserContext } from "@/app/context/UserContext";
import { User as userInterface } from '@/interfaces/User'
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Link } from "@nextui-org/react";

export const NavbarLayout = () => {

	const { users, loadUsers } = useContext(UserContext)

	useEffect(() => {
		loadUsers()
	}, [])

	const { data: session } = useSession()
	const path = useRouter()

	const user: userInterface = users.find(user => user.email === session?.user?.email)!;

	const searchInput = (
		<Input
			aria-label="Search"
			classNames={{
				inputWrapper: "bg-default-100",
				input: "text-sm",
			}}
			endContent={
				<Kbd className="hidden lg:inline-block" keys={["command"]}>
					K
				</Kbd>
			}
			labelPlacement="outside"
			placeholder="Search..."
			startContent={
				<SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
			}
			type="search"
		/>
	);

	return (
		<NextUINavbar
			maxWidth="xl"
			className=""
			isBordered
		>
			<NavbarBrand as="li" className="gap-3 max-w-fit ">
				<NextLink className="flex justify-start items-center gap-1" href="/">
					<Logo />
				</NextLink>
				<DropdownPages />
			</NavbarBrand>
			<NavbarContent as="div" justify="end" className="">
				<NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
				<ThemeSwitcher />
				{
					session?.user ? (
						<DropdownUser />
					) : <Button color="primary" variant="shadow" onClick={() => path.push('/login')}>
						Sign In
					</Button>
				}
			</NavbarContent>
		</NextUINavbar>
	);
};
