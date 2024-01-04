import { NextResponse } from "next/server";
import { conn } from '@/libs/mysql'

export async function GET() {
    const response = await conn.query('SELECT id_categoria, categoria FROM categoria ORDER BY id_categoria DESC;')
    return NextResponse.json(response)
}

export async function POST(request: Request) {
    const { categoria } = await request.json();
    try {
        const response = await conn.query("INSERT INTO `categoria` SET ?", {
            categoria: categoria
        })

        return NextResponse.json(
            {
                categoria: categoria
            }
        )

    } catch (error) {
        return NextResponse.json(error)
    }
}
