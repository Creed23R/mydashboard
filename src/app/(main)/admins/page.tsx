'use client'
import { AdminsContext } from '@/app/context/AdminsContext'
import TableData from './components/TableData'
import CardData from './components/CardData'
import React, { useContext, useEffect } from 'react'
import { useSession } from 'next-auth/react'

const AdminsPage = () => {

    const { admins } = useContext(AdminsContext)
    const { data: session, status } = useSession()

    if (!session || !session.user?.role || session.user?.role !== 'ADMIN') {
        return <p>No tienes permiso para acceder a esta página.</p>;
    }

    console.log(session.user.email)

    return (
        <section className='w-[100%] h-auto py-5 md:px-10'>
            <h1>ADMINS</h1>
            <div className='hidden md:block'>
                <TableData admins={admins} email={session.user.email}/>
            </div>
            <div className='md:hidden flex flex-col gap-5 bg-red-500'>
                <CardData admins={admins}/>
            </div>
        </section>
    )
}

export default AdminsPage