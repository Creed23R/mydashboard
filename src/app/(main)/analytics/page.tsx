'use client'
import React from 'react'
import { useSession } from "next-auth/react";

const AnalyticsPage = () => {

  const { data: session } = useSession();
  if (!session || !session.user?.role || session.user?.role !== 'ADMIN') {
    return <p>No tienes permiso para acceder a esta página.</p>;
  }


  return (
    <section className=' h-[calc(100vh-64px)] flex items-center justify-center'>
      <h2 className='text-3xl font-bold'>ANALYTICS PAGE</h2>
      <div id='firstContainer'>
        xd
      </div>
    </section>
  )
}

export default AnalyticsPage