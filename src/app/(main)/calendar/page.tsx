'use client'
import React, { useContext } from 'react'
import TableData from '../categories/components/TableData'
import { CategoriesContext } from '@/app/context/CategoriesContext'
import { useSession } from 'next-auth/react'

const CalendarPage = () => {

  const { categories } = useContext(CategoriesContext)
  const { data: session, status } = useSession()

  if (!session || !session.user?.role || session.user?.role === 'ADMIN') {
    return <p>No tienes permiso para acceder a esta página.</p>;
  }

  return (
    <section>
      <h1>USER</h1>
      <TableData categories={categories} />
    </section>
  )
}

export default CalendarPage