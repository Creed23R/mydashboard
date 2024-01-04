import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma"
import bcrypt from 'bcryptjs'
import { writeFile, readFile, unlink } from 'fs/promises'
import path from 'path'
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

export async function GET() {
    try {
        const response = await prisma.admins.findMany({
            select: {
                adminId: true,
                name: true,
                lastname: true,
                email: true,
                role: true,
                image: true,
                imgId: true,
                createdAt: true,
                updateAt: true,
            },
            orderBy: {
                adminId: 'desc',
            },
        });
        return NextResponse.json(response)
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(error.message);
        }
    }
}

export async function POST(request: Request) {

    try {
        const body = await request.formData();
        const image = body.get('image') as File | null;


        const name = body.get('name') as string;
        const lastname = body.get('lastname') as string;
        const email = body.get('email') as string;
        const role = body.get('role') as string;


        const existingUser = await prisma.admins.findUnique({
            where: {
                email: email,
            },
        })

        if (existingUser) {
            // console.log('Email already exists')
            return NextResponse.json(
                { message: 'Email already exists' },
                { status: 400 }
            );
        }


        let res: UploadApiResponse;
        if (!image) {
            const filePathDefault = path.join(process.cwd(), 'public', 'userDefault.png');
            res = await cloudinary.uploader.upload(filePathDefault)
        } else {
            const bytes = await image.arrayBuffer()
            const buffer = Buffer.from(bytes)
            res = await new Promise((resolve, reject) => {
                cloudinary.uploader
                    .upload_stream({}, (err, result: any) => {
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

        const user = await prisma.admins.create({
            data: {
                name: name,
                lastname: lastname,
                email: email,
                password: hashedPassword,
                role: role,
                image: res.secure_url,
                imgId: res.public_id
            },
        })

        console.log(user)

        return NextResponse.json({
            name: name,
            lastname: lastname,
            email: email,
            password: hashedPassword,
            role: role,
            image: res.secure_url,
            imgId: res.public_id
        })
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(error.message);
        }
    }
}