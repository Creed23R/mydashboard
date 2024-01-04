export interface Categories {
    id_categoria: number | null,
    categoria: string | null
}

export interface CategoriesTable {
    id_categoria: number | null,
    categoria: string | null,
    actions: string
}

export interface Params {
    params: { id_categoria: number }
}

export interface addCategorie {
    categoria: string | null
}

export type Categorie = {
    id_categoria: number | null,
    categoria: string | null
}