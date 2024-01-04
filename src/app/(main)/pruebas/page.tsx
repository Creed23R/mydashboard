'use client'
import { AdminsContext } from '@/app/context/AdminsContext'
import React, { useContext } from 'react'

const page = () => {

    const { admins } = useContext(AdminsContext)

    function formatDateString(dateString: string): string {
        const date = new Date(dateString);
        return date.toLocaleString(); // Puedes personalizar el formato según tus necesidades
    }

    return (
        <div>
            {
                admins.map(admin => (
                    <div key={admin.adminId}>
                        <p>{admin.adminId}</p>
                        <p>{admin.name}</p>
                        <p>{formatDateString(admin.createdAt)}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default page