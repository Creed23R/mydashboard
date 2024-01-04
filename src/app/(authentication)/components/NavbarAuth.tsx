import React from 'react'
import { ThemeSwitcher } from '@/components/ThemeSwitcher'
import { Navbar } from '@nextui-org/navbar'

const HeaderAuth = () => {
  return (
    <Navbar isBordered>
      <ThemeSwitcher />
    </Navbar>
  )
}

export default HeaderAuth