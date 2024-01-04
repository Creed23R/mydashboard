import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";


declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            name: string;
            lastname: string;
            email: string;
            role: string;
            image: string;
        } & DefaultSession
    }

    interface User extends DefaultUser{
        name: string;
        lastname: string;
        email: string;
        role: string;
        image: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        name: string;
        lastname: string;
        email: string;
        role: string;
        image: string;
    }
}