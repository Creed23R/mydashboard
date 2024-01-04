import { Params } from "@/interfaces/Products";
import { conn } from "@/libs/mysql";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: Params) {
    try {
        //const response = await conn.query('SELECT * FROM productos WHERE id = ?', [params.id_product])
        // const response = await conn.query('SELECT productos.id AS producto_id, productos.titulo AS producto_nombre, productos.descripcion AS producto_descripcion, productos.precio AS producto_precio, productos.porcentajeDescuento, productos.calificacion, productos.stock, productos.marca, productos.id_categoria, productos.imgUrl, productos.imgPublicId, GROUP_CONCAT(imagenes.imagenes) AS imagenes FROM productos LEFT JOIN imagenes ON productos.id = imagenes.id_producto WHERE productos.id = 1 GROUP BY productos.id, productos.titulo, productos.descripcion, productos.precio, productos.porcentajeDescuento, productos.calificacion, productos.stock, productos.marca, productos.id_categoria, productos.imgUrl, productos.imgPublicId;')
        const response = await conn.query(`
        SELECT 
            productos.id,
            productos.titulo,
            productos.descripcion,
            productos.precio,
            productos.porcentajeDescuento,
            productos.calificacion,
            productos.stock,
            productos.marca,
            productos.id_categoria,
            productos.imgUrl,
            productos.imgPublicId,
            GROUP_CONCAT(imagenes.imagenes) AS imagenes
        FROM productos
        LEFT JOIN imagenes ON productos.id = imagenes.id_producto
        WHERE productos.id = ?
        GROUP BY productos.id, productos.titulo, productos.descripcion, productos.precio, productos.porcentajeDescuento, productos.calificacion, productos.stock, productos.marca, productos.id_categoria, productos.imgUrl, productos.imgPublicId;
    `, [params.id_product]);
        return NextResponse.json(response)
    } catch (error) {
        console.log(error)
    }
}