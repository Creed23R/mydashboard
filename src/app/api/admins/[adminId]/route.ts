import { Params } from "@/interfaces/Admins";
import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma"

export async function GET(request: Request, { params }: Params) {
    const paramsId = params.adminId;
    const adminId = parseInt(paramsId)
    try {
        const admin = await prisma.admins.findUnique({
            where: {
                adminId: adminId,
            },
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
            }
        })
        return NextResponse.json(admin)
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(error.message);
        }
    }
}

export async function DELETE(request: Request, { params }: Params) {
    const paramsId = params.adminId;
    const adminId = parseInt(paramsId)

    try {
        const deleteAdmin = await prisma.admins.delete({
            where: {
                adminId: adminId,
            },
        })
        return NextResponse.json(`Admin ${deleteAdmin.name} deleted successfully`);
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(error.message);
        }
    }
}