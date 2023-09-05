// app/components/ThemeSwitcher.tsx
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/button";
import { MoonIcon } from "@/../public/MoonIcon"
import { SunIcon } from "@/../public/SunIcon"

export function ThemeSwitcher() {

    const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <div>
            <Button radius="full" variant="light" isIconOnly onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
                {
                    theme === 'light' ? <MoonIcon className={iconClasses} /> : <SunIcon className={iconClasses} />
                }
            </Button>
        </div>
    )
};