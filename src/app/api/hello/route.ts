import { NextResponse } from "next/server"
import { conn } from '@/libs/mysql'

interface User {
    id: number;
    name: string;
    lastname: string;
    email: string;
    password: string;
}

export async function GET() {
    const users: User[] = await conn.query(`SELECT * FROM users WHERE email = 'vivi@gmail.com'`)
    return NextResponse.json(users[0])
}

export async function POST(request: Request) {
    const body = await request.json()
    return NextResponse.json(body)
}