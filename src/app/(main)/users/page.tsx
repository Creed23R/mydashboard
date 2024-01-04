'use client'
import React from 'react'
import { conn } from '@/libs/mysql'
import { useState, useEffect, useContext } from 'react'
import { UserContext } from '@/app/context/UserContext'
import { Button } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { Table, TableHeader, TableColumn, TableCell, TableRow, TableBody } from '@nextui-org/table'
import TableData from './components/TableData'
import CardUsers from './components/CardUsers'

const UsersPage = () => {

    const { users } = useContext(UserContext)

    return (
        <section className='w-[100%] h-auto py-5 px-10'>
            <div className='hidden md:block'>
                <TableData users={users} />
            </div>
            <div className='md:hidden flex flex-col gap-5'>
                <CardUsers users={users} />
            </div>
        </section>
    )
}

export default UsersPage