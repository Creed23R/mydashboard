
import { User } from "@/interfaces/User";
import { conn } from '@/libs/mysql'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { writeFile, readFile, unlink } from 'fs/promises'
import path from 'path'
import { v2 as cloudinary } from 'cloudinary';
import { Params } from '@/interfaces/User'

cloudinary.config({
    cloud_name: 'dqndf1992',
    api_key: '491489471869962',
    api_secret: '6RDsM5CyfdjblOVzTNCOa9FofK8'
});

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

export async function DELETE(request: Request, { params }: Params) {
    try {
        const userId = params.userId;
        console.log(typeof(userId))
        const urls: any = await conn.query(`SELECT imgId FROM users WHERE id = ${userId}`);

        if (urls.length > 0) {
            const imgId: string = urls[0].imgId;
            //console.log(imgId);
            const res = await cloudinary.uploader.destroy(imgId)
            //console.log(res)
        } else {
            console.log("No se encontraron resultados.");
        }

        const result: DatabaseResponse = await conn.query(
            `DELETE FROM users WHERE id=${userId}`
        );

        return result.affectedRows > 0
            ? NextResponse.json(
                `El usuario ${params.userId} fue eliminado con exito`
            )
            : NextResponse.json(
                `El usuario ${params.userId} no pudo ser eliminado`
            );
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(error.message);
        }
    }
}


export async function PUT(request: Request, { params }: Params) {

    // console.log('PARAMS: ',params.userId)
    const body = await request.formData();
    (body.get('name'))
    // console.log(body.get('lastname'))
    // console.log(body.get('emailconsole.log'))
    // console.log(body.get('role'))

    const image = body.get('image') as File | null;
    //console.log(image)

    const userId = params.userId;
    const urls: any = await conn.query(`SELECT imgId FROM users WHERE id = ${userId}`);

    if (urls.length > 0) {
        const imgId: string = urls[0].imgId;
        //console.log(imgId);
        const res = await cloudinary.uploader.destroy(imgId)
        //console.log(res)
    } else {
        console.log("No se encontraron resultados.");
    }

    let filePath
    let res

    if (!image) {
        filePath = path.join(process.cwd(), 'public', 'userDefault.png');
        res = await cloudinary.uploader.upload(filePath)
    } else {
        const bytes = await image.arrayBuffer()
        const buffer = Buffer.from(bytes)
        filePath = path.join(process.cwd(), 'public', image.name)
        await writeFile(filePath, buffer)
        res = await cloudinary.uploader.upload(filePath)
        if (res) {
            await unlink(filePath)
        }
    }

    const response = await conn.query("UPDATE users SET name=?, lastname=?, email=?, role=?, image=?, imgId=? WHERE id=?", [
        body.get('name'),
        body.get('lastname'),
        body.get('email'),
        body.get('role'),
        res.secure_url,
        res.public_id,
        params.userId // El ID del usuario que deseas editar
    ]);

    return NextResponse.json({
        name: body.get('name'),
        lastname: body.get('lastname'),
        email: body.get('email'),
        role: body.get('role')
    })
}


export async function GET(request: Request, { params }: Params) {
    try {
        const userId = params.userId;
        const user: User[] = await conn.query(`SELECT id, name, lastname, email, password, role, image FROM users WHERE id=${userId}`);
        return NextResponse.json(user[0])
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(error.message);
        }
    }
}

