'use client'
import { Categories } from "@/interfaces/Categories";
import { createContext, Dispatch, SetStateAction, useState } from "react";

type FiltersContextType = {
    filters: {
        id_categoria: number;
        categoria: string;
    };
    setFilters: Dispatch<SetStateAction<{
        id_categoria: number;
        categoria: string;
    }>>;
};

export const FiltersContext = createContext<FiltersContextType>({
    filters: {
        id_categoria: 4,
        categoria: 'todos',
    },
    setFilters: () => { },
});

export function FiltersProvider({ children }: { children: React.ReactNode }) {
    const [filters, setFilters] = useState({
        id_categoria: 4,
        categoria: 'todos',
    });

    return (
        <FiltersContext.Provider value={{ filters, setFilters }}>
            {children}
        </FiltersContext.Provider>
    );
}
