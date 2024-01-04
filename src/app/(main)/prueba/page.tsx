'use client'
import { Button } from '@nextui-org/react'
import { useSession } from 'next-auth/react'
import React from 'react'

const page = () => {

    const { data: session, status } = useSession()


    return (
        <div>
            {
                !session || !session.user?.role || session.user?.role !== 'ADMIN' ?
                    <Button>Usuario</Button> :
                    <Button>Admin</Button>
            }
        </div>
    )
}

export default page