'use client'
import { CategoriesContext } from "@/app/context/CategoriesContext";
import { ProductsContext } from "@/app/context/ProductsContext";
import { useContext, useEffect, useState } from "react";
import { Products } from '@/interfaces/Products'
import { FiltersContext } from "@/app/context/FiltersContext";

export function useFilters() {

    const { filters, setFilters } = useContext(FiltersContext)
    const { products, loadProducts } = useContext(ProductsContext)

    useEffect(() => {
        loadProducts();
    }, [])

    const filterProducts = (products: Products[]) => {
        return products.filter(product => (
            filters.categoria === 'todos' ||
            product.id_categoria == filters.id_categoria
        ))
    }

    return { filters, setFilters, filterProducts }

}