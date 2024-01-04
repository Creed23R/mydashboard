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

export async function GET() {
    const users = await conn.query('SELECT id, name, lastname, email, role, password, image FROM users ORDER BY id DESC;')
    return NextResponse.json(users)
}

export async function POST(request: Request) {
    const body = await request.formData();
    const image = body.get('image') as File | null;

    const allEmails: Array<{ email: string }> = await conn.query('SELECT email FROM users');
    const existEmail = allEmails.find(user => user.email === body.get('email'));
    if (existEmail) {
        return NextResponse.json(
            { message: 'Email already exists' },
            { status: 400 }
        )
    }

    let res;
    if (!image) {
        const filePathDefault = path.join(process.cwd(), 'public', 'userDefault.png');
        res = await cloudinary.uploader.upload(filePathDefault)
    } else {
        const bytes = await image.arrayBuffer()
        const buffer = Buffer.from(bytes)
        res = await new Promise((resolve, reject) => {
            cloudinary.uploader
                .upload_stream({}, (err, result) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(result)
                })
                .end(buffer)
        })
    }

    const password: string | null = body.get('password') as string | null;
    if (!password) {
        return NextResponse.json(
            { message: 'Password not provided' },
            { status: 400 }
        );
    }
    const hashedPassword = await bcrypt.hash(password, 12)

    const response = await conn.query("INSERT INTO users SET ?", {
        name: body.get('name'),
        lastname: body.get('lastname'),
        email: body.get('email'),
        password: hashedPassword,
        role: body.get('role'),
        image: res.secure_url,
        imgId: res.public_id
    })
    return NextResponse.json({
        name: body.get('name'),
        lastname: body.get('lastname'),
        email: body.get('email'),
        password: hashedPassword,
        role: body.get('role'),
        image: res.secure_url,
        imgId: res.public_id
    })
}

