export interface Products {
    id: number | null,
    titulo: string | null,
    descripcion: string | null,
    precio: number | null,
    porcentajeDescuento: number | null,
    calificacion: number | null,
    stock: number | null,
    marca: string | null,
    id_categoria: number | null,
    imgUrl: string | null,
    imgPublicId: string | null,
    imagenes: string
}

export interface Params {
    params: { id_product: number }
}

