'use client'
import { CategoriesContext } from '@/app/context/CategoriesContext'
import React, { useContext } from 'react'
import TableData from './components/TableData'
import ModalAddCategory from './components/ModalAddCategory'
import CardUsers from './components/CardUsers'

const CategoriesPage = () => {

  const { categories } = useContext(CategoriesContext)
  // console.log(categories)

  return (
    <section className='w-[100%] px-10 pt-5'>
      <div className='hidden md:block'>
        <TableData categories={categories} />
      </div>
      <div className='block md:hidden'>
        <CardUsers categories={categories} />
      </div>
    </section>
  )
}

export default CategoriesPage