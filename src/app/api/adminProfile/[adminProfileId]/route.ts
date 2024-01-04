import { ParamsEmail } from "@/interfaces/Admins";
import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET(request: Request, { params }: ParamsEmail) {
    const email = params.adminProfileId;

    try {
        const adminProfile = await prisma.admins.findUnique({
            where: {
                email: email
            }
        })
        return NextResponse.json(adminProfile)
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(error.message);
        }
    }
}