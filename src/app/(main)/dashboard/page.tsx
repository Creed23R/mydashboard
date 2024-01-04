'use client'
import React from 'react'
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const DashboardPage = () => {

  const { data: session } = useSession()
  const router = useRouter()


  if (session?.user.role === 'ADMIN') {
    router.push('/admins')
  } else {
    router.push('/calendar')
  }
  return (
    <></>
  )
}

export default DashboardPage