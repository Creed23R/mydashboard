import { NextResponse } from "next/server";
import { conn } from '@/libs/mysql'

export async function GET() {
    // const productos = await conn.query('SELECT id, titulo, descripcion, precio, id_categoria, imgUrl, imgPublicId FROM productos ORDER BY id DESC;')
    const productos = await conn.query('SELECT id, titulo, descripcion, precio, id_categoria, imgUrl, imgPublicId FROM productos ORDER BY id DESC;')
    return NextResponse.json(productos);
}


export async function POST(request:Request) {
    const response = await request.json();
    return NextResponse.json(response);
}