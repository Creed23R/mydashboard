import { Params } from "@/interfaces/Categories";
import { conn } from "@/libs/mysql";
import { NextResponse } from "next/server";

interface DatabaseResponse {
    fieldCount: number;
    affectedRows: number;
    insertId: number;
    serverStatus: number;
    warningCount: number;
    message: string;
    protocol41: boolean;
    changedRows: number;
}

export async function GET(request: Request, { params }: Params) {
    try {
        const id_categoria = params.id_categoria;
        const response: any = await conn.query(`SELECT id_categoria, categoria FROM categoria where id_categoria = ${id_categoria}`)
        return NextResponse.json(response)
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Error al buscar categoria" })
    }
}


export async function DELETE(request: Request, { params }: Params) {

    const id_categoria = params.id_categoria;
    try {
        const response: DatabaseResponse = await conn.query("DELETE FROM `categoria` WHERE id_categoria = ?", id_categoria)

        if (response.affectedRows === 1) {
            return NextResponse.json({ message: `Categoría ${id_categoria} eliminada correctamente` });
        } else {
            return {
                status: 404,
                body: JSON.stringify({ error: "Categoría no encontrada" }),
            };
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Error al buscar categoria" })
    }
}