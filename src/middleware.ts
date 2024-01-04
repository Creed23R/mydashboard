export { default } from 'next-auth/middleware'

export const config = {
    matcher: [
        "/analytics/:path*",
        "/calendar/:path*",
        "/categories/:path*",
        "/dashboard/:path*",
        "/products/:path*",
        "/users/:path*",
    ]
}

