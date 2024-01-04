import { createContext, useEffect, useState } from "react";
import { Categories } from "@/interfaces/Categories";
import axios from "axios";

export const CategoriesContext = createContext<
    {
        categories: Categories[],
        // loadCategories: () => Promise<void>;
        createCategorie: (categoria: string) => Promise<any>;
        deleteCategory: (id_categoria: string) => Promise<any>;
    }
>
    ({
        categories: [],
        // loadCategories: async () => { },
        createCategorie: async (categoria: string) => null,
        deleteCategory: async (id_categoria: string) => null
    });

export const CategoriesProvider = ({ children }: { children: React.ReactNode }) => {

    const [categories, setCategories] = useState<any>([]);

    async function loadCategories() {
        try {
            const response = await axios.get('/api/categories')
            setCategories(response.data);
            // console.log(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    async function createCategorie(categoria: string): Promise<any> {
        try {
            const response = await axios.post("api/categories", { categoria });
            console.log(response.data)
            const newCategorie = response.data;
            setCategories([newCategorie, ...categories]);
            console.log(categories)
            loadCategories()
            return response; // Devuelve la respuesta completa
        } catch (error) {
            console.error("Error al crear categoria:", error);
            throw error;
        }
    }

    async function deleteCategory(id_categoria: string): Promise<any> {
        try {
            const response = await axios.delete(`/api/categories/${id_categoria}`);
            console.log(response.data);
            const newCategories = categories.filter((category: any) => category.id_categoria !== id_categoria);
            setCategories(newCategories);
            loadCategories()
            return response;
        } catch (error) {
            console.error("Error al eliminar categoria:", error);
            throw error;
        }
    }

    useEffect(() => {
        loadCategories()
    }, [])

    return (
        <CategoriesContext.Provider value={{ categories, createCategorie, deleteCategory }}>
            {children}
        </CategoriesContext.Provider>
    )
}