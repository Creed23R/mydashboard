'use client'
import { UserContext } from '@/app/context/UserContext'
import { useParams } from 'next/navigation'
import React, { useContext, useEffect } from 'react'
import UpdateForm from '@/app/(main)/users/[id]/UpdateForm'

const userPage = () => {

    const params = useParams();
    const { user, getUser } = useContext(UserContext)

    useEffect(() => {
        getUser(params.id + '')
    }, [])

    return (
        <section className="h-[100%] flex items-center flex-col">
            <div className='text-center text-2xl font-bold mb-10 mt-4'>
                <h2>Update</h2>
            </div>
            <div className="w-[50%]">
                {user && <UpdateForm user={user} />}
            </div>
        </section>
    )
}

export default userPage