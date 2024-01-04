'use client'
import { CategoriesContext } from '@/app/context/CategoriesContext';
import React, { useContext, useEffect, useState } from 'react'
import { Select, SelectItem } from '@nextui-org/select'
import { useFilters } from '@/hooks/UseFilters';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { ProductsContext } from '@/app/context/ProductsContext';
import { FiltersContext } from '@/app/context/FiltersContext';
import { Button } from '@nextui-org/button';
import { PlusIcon } from "@/components/Icons";

const HeaderProducts = () => {

  const path = useRouter();
  const { products, loadProducts } = useContext(ProductsContext)
  const { categories } = useContext(CategoriesContext)
  const { filters, setFilters } = useContext(FiltersContext)
  // console.log(filters)

  useEffect(() => {
    loadProducts();
  }, [])

  const handleChangeCategory = async (e: any) => {
    const response = await axios.get(`api/categories/${e.target.value}`)
    setFilters(prevState => ({
      ...prevState,
      id_categoria: e.target.value,
      categoria: response.data[0].categoria
    }))
  }

  return (
    <header className='flex flex-col sm:flex-row gap-5 justify-between items-center my-3'>
      <div className='flex flex-col w-[20%] gap-2'>
        <h2 className='text-2xl font-bold'>Products</h2>
      </div>
      <div className='sm:w-[70%] w-[100%] flex justify-end gap-3 items-center'>
        <Select
          variant='bordered'
          size='sm'
          label="Seleccione Categoria"
          className="max-w-xs m-0"
          onChange={handleChangeCategory}
        >
          {categories.map((categoria) => (
            <SelectItem
              key={categoria.id_categoria ? categoria.id_categoria : 4}
              value={categoria.categoria ? categoria.categoria : 'todos'}
            >
              {categoria.categoria?.toUpperCase()}
            </SelectItem>
          ))}
        </Select>
        <Button
          onClick={() => path.push("/addProducts")}
          className="bg-foreground text-background"
          endContent={<PlusIcon className="text-2xl" />}
        >
          Add New
        </Button>
      </div>
    </header>
  )
}

export default HeaderProducts