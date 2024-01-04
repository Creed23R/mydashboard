'use client'
import { ProductsContext } from '@/app/context/ProductsContext'
import React, { useContext, useEffect, useState } from 'react'
import { CardProduct } from '@/app/(main)/products/components/CardProduct'
import { useFilters } from '@/hooks/UseFilters'
import HeaderProducts from './components/HeaderProducts'

const foodPage = () => {

    const { filterProducts } = useFilters();
    const { products, loadProducts } = useContext(ProductsContext)

    useEffect(() => {
        loadProducts();
    }, [])

    const productsFiltered = filterProducts(products);
    
    return (
        <section className="w-[100%] sm:mt-3 sm:px-[150px] flex flex-col gap-6 mb-20">
            <HeaderProducts />
            <div className='grid place-items-center grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-16'>
                {
                    productsFiltered.map(product => (
                        <CardProduct product={product} key={product.id} />
                    ))
                }
            </div>

        </section>
    )
}

export default foodPage