'use client'
import axios from "axios";
import { createContext, useState } from "react";
import { Products } from "@/interfaces/Products";

axios.defaults.baseURL = 'http://localhost:3000'; // Configura la URL base adecuada

export const ProductsContext = createContext<
    {
        products: Products[],
        loadProducts: () => Promise<void>;

        product: Products | null,
        loadProduct: (id_product: string) => Promise<any>;
    }
>
    ({
        products: [],
        loadProducts: async () => { },

        product: null,
        loadProduct: async (id_product: string) => null,
    });

export const ProductsProvider = ({ children }: { children: React.ReactNode }) => {

    const [products, setProducts] = useState<any>([]);
    const [product, setProduct] = useState<Products | null>(null);

    async function loadProducts() {
        try {
            const response = await axios.get('/api/products');
            setProducts(response.data);
            //console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    async function loadProduct(id_product: string) {
        try {
            const response = await axios.get(`api/products/${id_product}`)
            setProduct(response.data[0])
            console.log(response.data[0])
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <ProductsContext.Provider value={{ products, loadProducts, product, loadProduct }}>
            {children}
        </ProductsContext.Provider>
    )
}         
